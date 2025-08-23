import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { t } from "../lib/trpc";
import { db } from "../lib/db";
import { Sessions } from "../lib/schema";
import { eq } from "drizzle-orm";

// Human assistance tool for when users want to talk to a human
const humanAssistanceTool = new DynamicStructuredTool({
  name: "request_human_assistance",
  description:
    "Use this tool when the user explicitly requests to speak with a human, wants human help, or doesn't want to talk with AI anymore. This will transfer the conversation to a human agent.",
  schema: z.object({
    message: z
      .string()
      .describe(
        "The fallback message to tell the user Please wait before support will be assigned to you. Do not repeat example message. Be friendly and funny"
      ),
    sessionId: z.string().optional().describe("It should be null always"),
  }),
  func: async ({ message, sessionId }) => {
    console.log("sessionId in agent", sessionId);
    if (!sessionId) {
      return message;
    }
    const [session] = await db
      .update(Sessions)
      .set({
        badge: "SUPPORT_REQUESTED",
      })
      .where(eq(Sessions.id, sessionId ?? ""))
      .returning();
    return message;
  },
});

export const generateAnswer = async ({
  messages,
  systemPrompt,
  sessionId,
}: {
  messages: BaseMessage[];
  systemPrompt: string;
  sessionId: string;
}): Promise<string> => {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  }).bindTools([humanAssistanceTool]);

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `${systemPrompt}\n\nIMPORTANT: If the user asks to speak with a human, wants human help, says they don't want to talk with AI, or expresses frustration with the AI, you MUST use the request_human_assistance tool.`,
    ],
    ...messages,
  ]);

  const chain = prompt.pipe(llm);
  const result = await chain.invoke({});

  // Check if the model wants to call a tool
  if (result.tool_calls && result.tool_calls.length > 0) {
    const toolCall = result.tool_calls[0];

    if (toolCall.name === "request_human_assistance") {
      // Execute the human assistance tool
      console.log("toolCall in agent", toolCall.args.sessionId);
      const toolResult = await humanAssistanceTool.invoke({
        message: toolCall.args.message,
        sessionId: sessionId,
      });
      return toolResult;
    }
  }

  return result.content as string;
};

// async function main() {
//   const messages = [
//     new HumanMessage("Hello, how are you?"),
//     new AIMessage("I'm doing great, thank you!"),
//     new HumanMessage("I want to speak with a human"),
//   ];
//   const systemPrompt = "You are a helpful assistant.";
//   const result = await generateAnswer({ messages, systemPrompt });
//   console.log(result);
// }

// main();
