import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppLoader } from "@/components/app-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sidekaam.in"),
  title: "SideKaam — Try Real Work Outside Your Career",
  description:
    "India's platform for verified part-time jobs and professional networking. AI-powered matching, Aadhaar-verified profiles, and instant UPI payments. Start in minutes.",
  keywords: [
    "part time jobs india",
    "side hustle india",
    "freelance part time",
    "kaam from home",
    "sidekaam",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SideKaam — Try Real Work Outside Your Career",
    description:
      "India's platform for verified part-time jobs and professional networking. AI-powered matching, Aadhaar-verified profiles, and instant UPI payments.",
    url: "https://sidekaam.in",
    siteName: "SideKaam",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SideKaam — India's platform for part-time work and professional networking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SideKaam — Try Real Work Outside Your Career",
    description:
      "India's platform for verified part-time jobs and professional networking. AI-powered matching and instant UPI payments.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DFHF6RF286"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DFHF6RF286');
        `}
      </Script>
      <body className="antialiased"><AppLoader>{children}</AppLoader></body>
    </html>
  );
}
