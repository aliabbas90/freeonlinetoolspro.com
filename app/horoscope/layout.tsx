import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Daily Horoscope, Zodiac Compatibility & Birth Chart",
  description:
    "Get your free daily horoscope, zodiac compatibility checker, and birth chart reading. AI-powered astrology in English, French, and Spanish. All 12 zodiac signs.",
  keywords: [
    "daily horoscope",
    "free horoscope",
    "zodiac compatibility",
    "birth chart",
    "horoscope du jour",
    "horoscopo diario",
    "astrology",
    "zodiac signs",
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
            name: "Daily Horoscope & Zodiac Compatibility",
            description:
              "Free daily horoscope, zodiac compatibility checker, and birth chart reading. AI-powered astrology.",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      {children}
    </>
  );
}
