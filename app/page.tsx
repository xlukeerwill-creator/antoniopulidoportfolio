"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Index from "@/components/sections/Index";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});

const SESSION_KEY = "aps_preloader_seen_v2";

export default function Home() {
  const [preloaderState, setPreloaderState] = useState<
    "checking" | "show" | "skip"
  >("checking");

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    setPreloaderState(alreadySeen ? "skip" : "show");
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setPreloaderState("skip");
  };

  const shouldAnimateHero = preloaderState === "skip";

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {preloaderState === "show" && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <Hero startAnimation={shouldAnimateHero} />
      <Index />
    </main>
  );
}
