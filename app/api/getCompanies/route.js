import OpenAI from "openai"
import systemPrompt from "@/libs/prompt_2"
import { NextResponse } from "next/server"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req) {
    const data = await req.json()
    // Check if data is empty
    if (!data.content.trim()) {
        return new NextResponse("No data provided.", { status: 400 })
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, data],
            model: "meta-llama/llama-3.1-8b-instruct",
            temperature: 0.2,
        })

        // Get the response text from the completion object
        const responseText = completion.choices[0]?.message?.content
        console.log(responseText)
        return new NextResponse(responseText || "No response from OpenAI.", { status: 200 })
    } catch (error) {
        console.error('Error fetching completion:', error)
        return new NextResponse("Error processing request.", { status: 500 })
    }
}
