import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate My Portfolio & Resume — Free AI Review",
  description:
    "Get instant AI feedback on your portfolio or resume for free. Get a score out of 10, strengths, weaknesses, and actionable improvement tips.",
  keywords: [
    "rate my portfolio",
    "portfolio review",
    "resume review ai",
    "rate my resume",
    "portfolio feedback",
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
            name: "Rate My Portfolio",
            description:
              "Get instant AI feedback on your portfolio or resume. Score, strengths, weaknesses, and tips.",
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
