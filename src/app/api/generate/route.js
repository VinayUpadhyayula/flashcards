import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const prompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards  without \`\`\`json in the begining.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`

export async function POST(req) {
    const data = await req.json();

    const geminiAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt + '\n\nText: ' + data.text);
    console.log(result.response.text());

    return new NextResponse(result.response.text())
}