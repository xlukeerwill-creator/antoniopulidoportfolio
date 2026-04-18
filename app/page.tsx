"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), { ssr: false });

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

let preloaderShownThisSession = false;

export default function Home() {
  const [phase, setPhase] = useState<"pending" | "preloader" | "post-preloader" | "returning">("pending");

  useIsoLayoutEffect(() => {
    if (preloaderShownThisSession) {
      setPhase("returning");
    } else {
      setPhase("preloader");
    }
  }, []);

  const handlePreloaderComplete = () => {
    preloaderShownThisSession = true;
    setPhase("post-preloader");
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {phase === "preloader" && <Preloader onComplete={handlePreloaderComplete} />}
      {phase !== "pending" && phase !== "preloader" && (
        <Hero
          startAnimation={phase === "post-preloader"}
          instantVisible={phase === "returning"}
        />
      )}
    </main>
  );
}