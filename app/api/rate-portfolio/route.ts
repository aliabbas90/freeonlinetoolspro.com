import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { description, role, experience } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Portfolio description is required" },
        { status: 400 }
      );
    }

    if (description.length > 5000) {
      return NextResponse.json(
        { error: "Text must be under 5000 characters" },
        { status: 400 }
      );
    }

    if (
      !process.env.ANTHROPIC_API_KEY ||
      process.env.ANTHROPIC_API_KEY === "your-key-here"
    ) {
      return NextResponse.json(
        { error: "API not configured. Please add your Anthropic API key." },
        { status: 500 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a senior hiring manager and career coach. Rate and review this portfolio/resume description.

Context:
- Role they're targeting: ${role || "Not specified"}
- Experience level: ${experience || "Not specified"}

Portfolio/Resume content:
${description}

Provide your review in this exact format:

SCORE: [number out of 10]

STRENGTHS:
- [strength 1]
- [strength 2]
- [strength 3]

WEAKNESSES:
- [weakness 1]
- [weakness 2]
- [weakness 3]

SUGGESTIONS:
- [actionable suggestion 1]
- [actionable suggestion 2]
- [actionable suggestion 3]
- [actionable suggestion 4]

VERDICT:
[2-3 sentence overall assessment with encouragement]

Be honest but constructive. Give specific, actionable advice.`,
        },
      ],
    });

    const result =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("Portfolio rate API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze. Please try again." },
      { status: 500 }
    );
  }
}
