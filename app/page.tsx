import HomeClient from "./HomeClient";
import { getAllThoughtsMeta, formatDate } from "@/lib/thoughts";
import type { LatestEssayData } from "@/components/sections/LatestEssay";

export default function Home() {
  const thoughts = getAllThoughtsMeta();
  const latest = thoughts[0] ?? null;

  const latestEssay: LatestEssayData | null = latest
    ? {
        slug: latest.slug,
        title: latest.title,
        subtitle: latest.subtitle,
        date: latest.date,
        excerpt: latest.excerpt,
        cover: latest.cover,
        tags: latest.tags,
        readingTime: latest.readingTime,
      }
    : null;

  const latestEssayFormattedDate = latest ? formatDate(latest.date) : "";

  return (
    <HomeClient
      latestEssay={latestEssay}
      latestEssayFormattedDate={latestEssayFormattedDate}
    />
  );
}