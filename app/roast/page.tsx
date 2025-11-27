'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Action, Actions } from '@/components/ai-elements/actions';
import { Fragment, useState, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';
import { CopyIcon, RefreshCcwIcon, Send, ArrowLeft } from 'lucide-react';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

const models = [
  {
    name: 'Gemini 2.5 Flash',
    value: 'google/gemini-2.0-flash-lite-001',
  }
];

export default function RoastPage() {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [model] = useState<string>(models[0].value);
  const [webSearch] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      sendMessage(
        { 
          text: input,
          files: [] 
        },
        {
          body: {
            model: model,
            webSearch: webSearch,
          },
        },
      );
      setInput('');
      setIsExpanded(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    setIsExpanded(e.target.value.length > 100 || e.target.value.includes("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <main className="h-[calc(100vh-8rem)] flex flex-col">
      <Navigation />
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium mb-1">Roast me</h1>
        <p className="text-sm text-muted-foreground">
          AI that is not sycophantic.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <Conversation className="flex-1 min-h-0">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="py-8 text-muted-foreground text-sm">
                <p>Try asking:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground/70">
                  <li>• "What do you think about my code?"</li>
                  <li>• "Roast my career choices"</li>
                  <li>• "What's wrong with DevOps engineers?"</li>
                </ul>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                  <Sources>
                    <SourcesTrigger
                      count={
                        message.parts.filter(
                          (part) => part.type === 'source-url',
                        ).length
                      }
                    />
                    {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                      <SourcesContent key={`${message.id}-${i}`}>
                        <Source
                          key={`${message.id}-${i}`}
                          href={part.url}
                          title={part.url}
                        />
                      </SourcesContent>
                    ))}
                  </Sources>
                )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <Response>
                                {part.text}
                              </Response>
                            </MessageContent>
                          </Message>
                          {message.role === 'assistant' && i === messages.length - 1 && (
                            <Actions className="mt-2">
                              <Action
                                onClick={() => regenerate()}
                                label="Retry"
                              >
                                <RefreshCcwIcon className="size-3" />
                              </Action>
                              <Action
                                onClick={() =>
                                  navigator.clipboard.writeText(part.text)
                                }
                                label="Copy"
                              >
                                <CopyIcon className="size-3" />
                              </Action>
                            </Actions>
                          )}
                        </Fragment>
                      );
                    case 'reasoning':
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input Area */}
        <div className="pt-4 border-t border-border mt-auto">
          <form onSubmit={handleSubmit}>
            <div
              className={cn(
                "bg-muted/30 border border-border transition-all duration-200",
                {
                  "rounded-xl p-3": isExpanded,
                  "rounded-full p-2 pl-4": !isExpanded,
                }
              )}
            >
              <div className={cn("flex items-center gap-2", { "flex-col": isExpanded })}>
                <div className="flex-1 w-full">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className={cn(
                      "min-h-0 resize-none border-0 p-0 text-sm bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0",
                      { "min-h-[60px]": isExpanded }
                    )}
                    rows={1}
                  />
                </div>
                <div className={cn("flex items-center gap-2", { "w-full justify-end": isExpanded })}>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90"
                    disabled={!input.trim() || status === 'submitted' || status === 'streaming'}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

