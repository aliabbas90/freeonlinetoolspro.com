import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { sign, type, lang, partnerSign, birthday } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your-key-here") {
      return NextResponse.json({ error: "API not configured" }, { status: 500 });
    }

    const langMap: Record<string, string> = {
      en: "English",
      fr: "French",
      es: "Spanish",
    };
    const language = langMap[lang] || "English";

    let prompt = "";

    if (type === "daily") {
      prompt = `You are a mystical astrologer. Generate a daily horoscope for ${sign} for today. Write in ${language}.

Format your response EXACTLY like this:
OVERALL: [1 paragraph general daily reading, 3-4 sentences]

LOVE: [1-2 sentences about love/relationships today]

CAREER: [1-2 sentences about career/work today]

HEALTH: [1-2 sentences about health/wellness today]

LUCKY_NUMBER: [a number between 1-99]
LUCKY_COLOR: [a color]
MOOD: [one word mood]
RATING: [number 1-5 representing how good the day is]

Be specific, engaging, and positive but realistic. Include actionable advice.`;
    } else if (type === "compatibility") {
      prompt = `You are a mystical astrologer. Analyze the zodiac compatibility between ${sign} and ${partnerSign}. Write in ${language}.

Format your response EXACTLY like this:
OVERALL_SCORE: [number 1-100]

LOVE: [2-3 sentences about romantic compatibility]
LOVE_SCORE: [number 1-100]

FRIENDSHIP: [2-3 sentences about friendship compatibility]
FRIENDSHIP_SCORE: [number 1-100]

WORK: [2-3 sentences about work compatibility]
WORK_SCORE: [number 1-100]

STRENGTHS: [3 bullet points about what works well]

CHALLENGES: [3 bullet points about potential challenges]

ADVICE: [2-3 sentences of advice for this pairing]

Be specific and insightful.`;
    } else if (type === "birthchart") {
      prompt = `You are a mystical astrologer. Generate a personality and birth chart reading for someone born on ${birthday}. Write in ${language}.

Format your response EXACTLY like this:
SUN_SIGN: [their zodiac sign]
ELEMENT: [Fire/Earth/Air/Water]

PERSONALITY: [3-4 sentences about their core personality traits]

STRENGTHS: [4 bullet points]

WEAKNESSES: [3 bullet points]

LOVE_STYLE: [2-3 sentences about how they love]

CAREER_PATH: [2-3 sentences about ideal careers]

LIFE_ADVICE: [2-3 sentences of personalized advice]

FAMOUS_MATCHES: [3 famous people with the same sign]

Be specific, insightful, and encouraging.`;
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const result = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Horoscope API error:", error);
    return NextResponse.json({ error: "Failed to read the stars. Try again." }, { status: 500 });
  }
}
