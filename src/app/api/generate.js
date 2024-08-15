import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const prompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
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
    const geminiAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = await req.json()
    //console.log(data)
    const result = model.generateContent(prompt);
    //console.log(result);
    

    return new NextResponse(result.response.text())
}