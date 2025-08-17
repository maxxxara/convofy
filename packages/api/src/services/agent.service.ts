import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const sendMessage = async ({
  messages,
  systemPrompt,
}: {
  messages: BaseMessage[];
  systemPrompt: string;
}) => {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  });
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ...messages,
  ]);
  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  const result = await chain.invoke({});
  return result;
};
