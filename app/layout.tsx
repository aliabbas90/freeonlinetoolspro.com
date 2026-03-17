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
    default: `${siteName} — Free Online Tools | Outils Gratuits | Herramientas Gratis`,
    template: `%s | ${siteName}`,
  },
  description:
    "Free online tools: QR code generator, image resizer, AI text humanizer, daily horoscope, deal finder, invoice generator, and more. No signup. 100% free. | Outils en ligne gratuits | Herramientas en linea gratis.",
  keywords: [
    // English
    "free online tools", "free tools", "online tools", "web tools", "free utilities",
    "qr code generator", "image resizer", "password generator", "json formatter",
    "ai text humanizer", "daily horoscope", "deal finder", "invoice generator",
    "youtube thumbnail downloader", "css gradient generator", "meta tag generator",
    "base64 encoder", "markdown editor", "favicon generator", "color palette extractor",
    // French
    "outils en ligne gratuits", "outils gratuits", "generateur qr code gratuit",
    "redimensionner image", "horoscope du jour", "generateur de mot de passe",
    "compresseur image", "convertisseur texte", "outils web gratuits",
    // Spanish
    "herramientas en linea gratis", "herramientas gratuitas", "generador codigo qr",
    "redimensionar imagen", "horoscopo diario", "generador de contrasenas",
    "compresor de imagenes", "herramientas web gratis",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    languages: {
      "en": siteUrl,
      "fr": siteUrl,
      "es": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Free Online Tools`,
    description:
      "18+ free online tools: AI humanizer, daily horoscope, deal finder, QR codes, image tools & more. No signup. Runs in your browser.",
    url: siteUrl,
    locale: "en_US",
    alternateLocale: ["fr_FR", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — 18+ Free Online Tools`,
    description: "Free tools: AI humanizer, horoscope, deal finder, QR codes & more. No signup required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code-here",
  },
  category: "technology",
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
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TW29W5Z3');`}
      </Script>
      {/* Google Analytics (GA4) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R63K771L2V"
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R63K771L2V');`}
      </Script>
      {process.env.NEXT_PUBLIC_ADSENSE_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <body
        className={`${geistSans.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TW29W5Z3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
