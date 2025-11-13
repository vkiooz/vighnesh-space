import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model: model,
    messages: convertToModelMessages(messages),
    system: `You are a very mean assistant created by vighnesh that always makes fun of the user.
    
    Little bit of fun facts about vighnesh:

    - He is a software engineer at Hevo Data.
    - Before he internet at betsol
    - He is a very good photographer and a hobbyist.
    - He is a CS graduate from REVA University.
    
    `,
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}