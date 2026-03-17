import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Text Humanizer — Make AI Text Sound Human",
  description:
    "Make AI-generated text sound natural and human-written for free. Works with ChatGPT, Claude, Gemini. Bypass AI detection. Choose tone: casual, professional, academic, creative.",
  keywords: [
    "ai text humanizer",
    "make ai text human",
    "humanize chatgpt text",
    "bypass ai detection",
    "ai text rewriter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Text Humanizer",
            description:
              "Make AI-generated text sound natural and human-written. Works with ChatGPT, Claude, Gemini.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  );
}
