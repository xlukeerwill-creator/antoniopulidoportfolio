"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Index from "@/components/sections/Index";

const Preloader = dynamic(() => import("@/components/preloader/Preloader"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Hero startAnimation={!isLoading} />
      <Index />
    </main>
  );
}
