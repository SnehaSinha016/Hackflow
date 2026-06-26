import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (prompt) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    temperature: 0.4,

    messages: [
      {
        role: "system",
        content: `
You are a senior software architect.

Always return VALID JSON ONLY.

Never use markdown.

Never use \`\`\`.

Never explain.

Return exactly what the user requests.

If the user asks for an array, return ONLY the array.

If the user asks for an object, return ONLY the object.
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
};