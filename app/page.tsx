"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Index from "@/components/sections/Index";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});

const SESSION_KEY = "aps_preloader_seen";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "1";
    setShowPreloader(!alreadySeen);
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowPreloader(false);
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {showPreloader === true && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <Hero startAnimation={showPreloader === false} />
      <Index />
    </main>
  );
}
