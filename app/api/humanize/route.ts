import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, tone } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Text must be under 5000 characters" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your-key-here") {
      return NextResponse.json(
        { error: "API not configured. Please add your Anthropic API key." },
        { status: 500 }
      );
    }

    const toneInstructions: Record<string, string> = {
      casual: "Use a casual, friendly, conversational tone. Like talking to a friend.",
      professional: "Use a professional but natural tone. Polished but not robotic.",
      academic: "Use an academic tone with proper structure, but keep it readable and human.",
      creative: "Use a creative, engaging tone with personality and flair.",
    };

    const toneGuide = toneInstructions[tone] || toneInstructions.casual;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Rewrite the following text to sound completely natural and human-written. ${toneGuide}

Rules:
- Vary sentence length naturally
- Use contractions where appropriate
- Add subtle imperfections that real humans make (occasional informal phrasing)
- Avoid repetitive sentence structures
- Keep the same meaning and key information
- Do NOT add any commentary, just output the rewritten text
- Match the approximate length of the original

Text to humanize:
${text}`,
        },
      ],
    });

    const result =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("Humanize API error:", error);
    return NextResponse.json(
      { error: "Failed to process text. Please try again." },
      { status: 500 }
    );
  }
}
