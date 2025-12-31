

import { OpenAI } from "openai";
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

const policyContext = `
STORE POLICIES (Use only this information):

1. Store Credit:
- Store credit is offered only to approved loyal customers.
- Eligibility is determined by the store.
- Store credit is applicable only for orders with more than 5 items.
- Store credit cannot be exchanged for cash.

2. Shipping:
- Orders are shipped within 24–48 hours after confirmation.
- Delivery typically takes 3–7 business days.

3. Shipping Locations:
- We currently deliver only to the following countries:
  - United States
  - India
  - Canada

4. Payment Methods:
- UPI
- Credit Cards
- Debit Cards
- Net Banking
- Cash on Delivery (COD)

5. Returns:
- Returns are accepted within 7 days of delivery.
- Products must be in original packaging.
`;

let conversation = [
  {
    role: "system",
    content: `
You are a helpful AI assistant. Always format responses using clean Markdown with headings and bullet points.
Rules:
- Stay concise
- Use Markdown
- Do not hallucinate facts
- If unsure, say "I don't know"
- Do not generate harmful, illegal, or explicit content
`
  },
  {
    role: "system",
    content: policyContext
  }
];


export const generateAiResponse = async (userInput) => {
  try {
    if (!userInput || typeof userInput !== "string") {
      throw new Error("Invalid user input");
    }
    if (userInput.length > 200) {
      const err = new Error("Please keep prompt length less than 200 characters");
      err.status = 455;
      throw err;
    }
    conversation.push({
      role: "user",
      content: userInput
    });
    const completion = await client.chat.completions.create({
      // model: "openai/gpt-oss-20b:hyperbolic",
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: conversation,
      max_tokens: 300
    });

    const aiText = completion.choices?.[0]?.message?.content;

    if (!aiText || typeof aiText !== "string") {
      throw new Error("AI returned empty response");
    }

    conversation.push({
      role: "assistant",
      content: aiText
    });

    return aiText;
  } catch (error) {
    throw error;
  }
};
