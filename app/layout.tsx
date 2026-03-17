import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI ToolKit";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolkit.app";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Free Online Tools`,
    template: `%s | ${siteName}`,
  },
  description:
    "Free online tools: QR code generator, image resizer, color palette extractor, text tools, favicon generator and more. No signup required. 100% free.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Free Online Tools`,
    description:
      "Free online tools: QR code generator, image resizer, color palette extractor, text tools, and more. No signup. Runs in your browser.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-4108068714803334",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_ADSENSE_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <body
        className={`${geistSans.variable} font-sans antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
