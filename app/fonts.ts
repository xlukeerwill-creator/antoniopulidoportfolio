import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-var",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});
