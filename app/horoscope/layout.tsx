import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://freeonlinetoolspro.com";

export const metadata: Metadata = {
  title: "Free Daily Horoscope, Zodiac Compatibility & Birth Chart",
  description:
    "Get your free daily horoscope, zodiac compatibility checker, and birth chart reading. AI-powered astrology in English, French, and Spanish. All 12 zodiac signs: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.",
  keywords: [
    // English
    "daily horoscope", "free horoscope", "horoscope today", "zodiac compatibility",
    "birth chart", "astrology", "zodiac signs", "love horoscope", "career horoscope",
    "aries horoscope", "taurus horoscope", "gemini horoscope", "cancer horoscope",
    "leo horoscope", "virgo horoscope", "libra horoscope", "scorpio horoscope",
    "sagittarius horoscope", "capricorn horoscope", "aquarius horoscope", "pisces horoscope",
    "zodiac love compatibility", "star sign compatibility", "free astrology reading",
    // French
    "horoscope du jour", "horoscope gratuit", "horoscope quotidien", "compatibilite zodiacale",
    "theme astral", "astrologie", "signes du zodiaque", "horoscope amour",
    "horoscope belier", "horoscope taureau", "horoscope gemeaux", "horoscope cancer",
    "horoscope lion", "horoscope vierge", "horoscope balance", "horoscope scorpion",
    "horoscope sagittaire", "horoscope capricorne", "horoscope verseau", "horoscope poissons",
    "compatibilite amoureuse", "compatibilite signes astrologiques",
    // Spanish
    "horoscopo diario", "horoscopo gratis", "horoscopo de hoy", "compatibilidad zodiacal",
    "carta astral", "astrologia", "signos del zodiaco", "horoscopo del amor",
    "horoscopo aries", "horoscopo tauro", "horoscopo geminis", "horoscopo cancer",
    "horoscopo leo", "horoscopo virgo", "horoscopo libra", "horoscopo escorpio",
    "horoscopo sagitario", "horoscopo capricornio", "horoscopo acuario", "horoscopo piscis",
    "compatibilidad de signos", "carta natal gratis",
  ],
  alternates: {
    languages: {
      "en": `${siteUrl}/horoscope`,
      "fr": `${siteUrl}/horoscope`,
      "es": `${siteUrl}/horoscope`,
    },
  },
  openGraph: {
    title: "Free Daily Horoscope, Zodiac Compatibility & Birth Chart",
    description:
      "AI-powered daily horoscope for all 12 zodiac signs. Check zodiac compatibility and get your birth chart reading. Free in English, French & Spanish.",
    type: "website",
    url: `${siteUrl}/horoscope`,
    siteName: "Free Online Tools Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Daily Horoscope & Zodiac Compatibility",
    description:
      "AI-powered horoscope for all 12 signs. Check love compatibility & birth chart. Free in EN/FR/ES.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
              "Free daily horoscope, zodiac compatibility, and birth chart reading. AI-powered astrology in English, French, and Spanish.",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "Any",
            inLanguage: ["en", "fr", "es"],
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: `${siteUrl}/horoscope`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is my zodiac sign?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your zodiac sign is determined by your birth date. Aries (Mar 21-Apr 19), Taurus (Apr 20-May 20), Gemini (May 21-Jun 20), Cancer (Jun 21-Jul 22), Leo (Jul 23-Aug 22), Virgo (Aug 23-Sep 22), Libra (Sep 23-Oct 22), Scorpio (Oct 23-Nov 21), Sagittarius (Nov 22-Dec 21), Capricorn (Dec 22-Jan 19), Aquarius (Jan 20-Feb 18), Pisces (Feb 19-Mar 20).",
                },
              },
              {
                "@type": "Question",
                name: "How does zodiac compatibility work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Zodiac compatibility analyzes the relationship between two signs based on their elements (Fire, Earth, Air, Water), planetary rulers, and astrological aspects to determine harmony in love, friendship, and work.",
                },
              },
              {
                "@type": "Question",
                name: "What is a birth chart?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A birth chart (natal chart) is a map of where all the planets were at the exact moment of your birth. It reveals your personality traits, strengths, weaknesses, and life tendencies.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
