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
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Mic,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";

const models = [
  {
    name: 'Gemini 2.5 Flash',
    value: 'google/gemini-2.0-flash-lite-001',
  }
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleSubmit(e as any);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
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

        <div className="w-full mt-4">

          <form onSubmit={handleSubmit} className="group/composer w-full">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {}}
            />

            <div
              className={cn(
                "w-full max-w-2xl mx-auto bg-transparent dark:bg-muted/50 cursor-text overflow-clip bg-clip-padding p-2.5 shadow-lg border border-border transition-all duration-200",
                {
                  "rounded-3xl grid grid-cols-1 grid-rows-[auto_1fr_auto]":
                    isExpanded,
                  "rounded-[28px] grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]":
                    !isExpanded,
                }
              )}
              style={{
                gridTemplateAreas: isExpanded
                  ? "'header' 'primary' 'footer'"
                  : "'header header header' 'leading primary trailing' '. footer .'",
              }}
            >
              <div
                className={cn(
                  "flex min-h-14 items-center overflow-x-hidden px-1.5",
                  {
                    "px-2 py-1 mb-0": isExpanded,
                    "-my-2.5": !isExpanded,
                  }
                )}
                style={{ gridArea: "primary" }}
              >
                <div className="flex-1 overflow-auto max-h-52">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything"
                    className="min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin dark:bg-transparent"
                    rows={1}
                  />
                </div>
              </div>

              {/* <div
                className={cn("flex", { hidden: isExpanded })}
                style={{ gridArea: "leading" }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-accent outline-none ring-0"
                    >
                      <Plus className="size-6 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="max-w-xs rounded-2xl p-1.5"
                  >
                    <DropdownMenuGroup className="space-y-1">
                      <DropdownMenuItem
                        className="rounded-[calc(1rem-6px)]"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip size={20} className="opacity-60" />
                        Add photos & files
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-[calc(1rem-6px)]"
                        onClick={() => {}}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles size={20} className="opacity-60" />
                          Agent mode
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-[calc(1rem-6px)]"
                        onClick={() => setWebSearch(!webSearch)}
                      >
                        <Search size={20} className="opacity-60" />
                        Deep Research
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}

              <div
                className="flex items-center gap-2"
                style={{ gridArea: isExpanded ? "footer" : "trailing" }}
              >
                <div className="ms-auto flex items-center gap-1.5">
                  {/* <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-accent"
                  >
                    <Mic className="size-5 text-muted-foreground" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-accent relative"
                  >
                    <Volume2 className="size-5 text-muted-foreground" />
                  </Button> */}

                  {input.trim() && (
                    <Button
                      type="submit"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      disabled={status === 'submitted' || status === 'streaming'}
                    >
                      <Send className="size-5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotDemo;