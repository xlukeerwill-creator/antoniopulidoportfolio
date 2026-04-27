import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";
import "./globals.css";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import MicrosoftClarity from "@/components/layout/MicrosoftClarity";

export const metadata: Metadata = {
  metadataBase: new URL("https://antoniopulidosaez.com"),
  title: {
    default: "Antonio Pulido Sáez — Portfolio",
    template: "%s | Antonio Pulido Sáez",
  },
  description:
    "Spanish lawyer based in Washington D.C. MSc International Business candidate at The George Washington University. Bridging law, business and technology.",
  keywords: [
    "Antonio Pulido Sáez",
    "Antonio Pulido",
    "Pulido Sáez",
    "lawyer Washington DC",
    "abogado Washington",
    "GWU MSc International Business",
    "international business lawyer",
    "Spanish lawyer DC",
  ],
  authors: [{ name: "Antonio Pulido Sáez" }],
  creator: "Antonio Pulido Sáez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antoniopulidosaez.com",
    siteName: "Antonio Pulido Sáez",
    title: "Antonio Pulido Sáez — Portfolio",
    description:
      "Spanish lawyer based in Washington D.C. Bridging law, business and technology.",
    images: [
      {
        url: "/images/antonio-hero.png",
        width: 1200,
        height: 630,
        alt: "Antonio Pulido Sáez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Pulido Sáez — Portfolio",
    description:
      "Spanish lawyer based in Washington D.C. Bridging law, business and technology.",
    images: ["/images/antonio-hero.png"],
  },
  icons: {
  icon: [
    { url: "/icon.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
    { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  ],
},
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "CGHfnZzpFYLm8rvfafoIz_6ygKTNVPW1MJmdVJidUZI",
  },
  alternates: {
    canonical: "https://antoniopulidosaez.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  );
}