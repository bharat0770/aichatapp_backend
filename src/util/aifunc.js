

import { OpenAI } from "openai";
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

let conversation = [
  {
    role: "system",
    content: "You are a helpful AI assistant. Always format responses using clean Markdown with headings and bullet points."
  }
];


export const generateAiResponse = async (userInput) => {
  try {
    if (!userInput || typeof userInput !== "string") {
      throw new Error("Invalid user input");
    }

    conversation.push({
      role: "user",
      content: userInput
    });
    console.log("conversations ::: ", conversation);

    const completion = await client.chat.completions.create({
      // model: "openai/gpt-oss-20b:hyperbolic",
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: conversation, // ✅ LIMIT CONTEXT
      max_tokens: 300                     // ✅ REQUIRED for HF stability
    });

    const aiText = completion.choices?.[0]?.message?.content;

    // 🛑 Guard AI response
    if (!aiText || typeof aiText !== "string") {
      throw new Error("AI returned empty response");
    }

    conversation.push({
      role: "assistant",
      content: aiText
    });

    return aiText;
  } catch (error) {
    console.log(error)
    return error
  }
  // 🛑 Guard user input

};
