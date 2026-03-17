import { Metadata } from "next";
import { tools } from "@/lib/tools-registry";

const tool = tools.find((t) => t.slug === "annonce-generator")!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    locale: "fr_FR",
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
            name: tool.name,
            description: tool.metaDescription,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            inLanguage: "fr",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          }),
        }}
      />
      {children}
    </>
  );
}
