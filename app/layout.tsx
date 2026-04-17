import type { Metadata } from "next";
import { instrumentSerif, geist, geistMono } from "./fonts";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antonio Pulido Saez — Portfolio",
  description:
    "Spanish lawyer based in Washington D.C. Bridging law, business and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
