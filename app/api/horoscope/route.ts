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
      prompt = `You are a mystical astrologer. Generate a daily horoscope for ${sign} for today. Write EVERYTHING in ${language}, including ALL labels and headings — no English words at all if the language is not English.

Write it as a beautiful, flowing reading with these sections. Use the translated section names:

${lang === "fr" ? "GENERAL" : lang === "es" ? "GENERAL" : "OVERALL"}: [1 paragraph general daily reading, 3-4 sentences]

${lang === "fr" ? "AMOUR" : lang === "es" ? "AMOR" : "LOVE"}: [1-2 sentences about love/relationships today]

${lang === "fr" ? "CARRIERE" : lang === "es" ? "CARRERA" : "CAREER"}: [1-2 sentences about career/work today]

${lang === "fr" ? "SANTE" : lang === "es" ? "SALUD" : "HEALTH"}: [1-2 sentences about health/wellness today]

${lang === "fr" ? "NUMERO CHANCEUX" : lang === "es" ? "NUMERO DE LA SUERTE" : "LUCKY NUMBER"}: [a number between 1-99]
${lang === "fr" ? "COULEUR DU JOUR" : lang === "es" ? "COLOR DEL DIA" : "LUCKY COLOR"}: [a color in ${language}]
${lang === "fr" ? "HUMEUR" : lang === "es" ? "ESTADO DE ANIMO" : "MOOD"}: [one word mood in ${language}]
${lang === "fr" ? "NOTE DU JOUR" : lang === "es" ? "PUNTUACION" : "RATING"}: [number 1-5] /5

Be specific, engaging, and positive but realistic. Include actionable advice. Write everything in ${language}.`;
    } else if (type === "compatibility") {
      prompt = `You are a mystical astrologer. Analyze the zodiac compatibility between ${sign} and ${partnerSign}. Write EVERYTHING in ${language}, including ALL labels — no English words if the language is not English.

${lang === "fr" ? "SCORE GLOBAL" : lang === "es" ? "PUNTUACION GENERAL" : "OVERALL SCORE"}: [number 1-100]%

${lang === "fr" ? "AMOUR" : lang === "es" ? "AMOR" : "LOVE"}: [2-3 sentences about romantic compatibility]
${lang === "fr" ? "Score Amour" : lang === "es" ? "Puntuacion Amor" : "Love Score"}: [number 1-100]%

${lang === "fr" ? "AMITIE" : lang === "es" ? "AMISTAD" : "FRIENDSHIP"}: [2-3 sentences about friendship compatibility]
${lang === "fr" ? "Score Amitie" : lang === "es" ? "Puntuacion Amistad" : "Friendship Score"}: [number 1-100]%

${lang === "fr" ? "TRAVAIL" : lang === "es" ? "TRABAJO" : "WORK"}: [2-3 sentences about work compatibility]
${lang === "fr" ? "Score Travail" : lang === "es" ? "Puntuacion Trabajo" : "Work Score"}: [number 1-100]%

${lang === "fr" ? "POINTS FORTS" : lang === "es" ? "FORTALEZAS" : "STRENGTHS"}: [3 bullet points]

${lang === "fr" ? "DEFIS" : lang === "es" ? "DESAFIOS" : "CHALLENGES"}: [3 bullet points]

${lang === "fr" ? "CONSEIL" : lang === "es" ? "CONSEJO" : "ADVICE"}: [2-3 sentences of advice]

Be specific and insightful. Write everything in ${language}.`;
    } else if (type === "birthchart") {
      prompt = `You are a mystical astrologer. Generate a personality and birth chart reading for someone born on ${birthday}. Write EVERYTHING in ${language}, including ALL labels — no English words if the language is not English.

${lang === "fr" ? "SIGNE SOLAIRE" : lang === "es" ? "SIGNO SOLAR" : "SUN SIGN"}: [their zodiac sign in ${language}]
${lang === "fr" ? "ELEMENT" : lang === "es" ? "ELEMENTO" : "ELEMENT"}: [Fire/Earth/Air/Water in ${language}]

${lang === "fr" ? "PERSONNALITE" : lang === "es" ? "PERSONALIDAD" : "PERSONALITY"}: [3-4 sentences about their core personality traits]

${lang === "fr" ? "POINTS FORTS" : lang === "es" ? "FORTALEZAS" : "STRENGTHS"}: [4 bullet points]

${lang === "fr" ? "FAIBLESSES" : lang === "es" ? "DEBILIDADES" : "WEAKNESSES"}: [3 bullet points]

${lang === "fr" ? "EN AMOUR" : lang === "es" ? "EN EL AMOR" : "LOVE STYLE"}: [2-3 sentences about how they love]

${lang === "fr" ? "CARRIERE IDEALE" : lang === "es" ? "CARRERA IDEAL" : "CAREER PATH"}: [2-3 sentences about ideal careers]

${lang === "fr" ? "CONSEIL DE VIE" : lang === "es" ? "CONSEJO DE VIDA" : "LIFE ADVICE"}: [2-3 sentences of personalized advice]

${lang === "fr" ? "CELEBRITES DU MEME SIGNE" : lang === "es" ? "FAMOSOS DEL MISMO SIGNO" : "FAMOUS MATCHES"}: [3 famous people with the same sign]

Be specific, insightful, and encouraging. Write everything in ${language}.`;
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
