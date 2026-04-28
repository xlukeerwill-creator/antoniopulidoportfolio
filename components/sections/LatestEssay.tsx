"use client";
import Link from "next/link";
import Image from "next/image";

export interface LatestEssayData {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
  readingTime: string;
}

interface Props {
  essay: LatestEssayData | null;
  formattedDate: string;
}

export default function LatestEssay({ essay, formattedDate }: Props) {
  if (!essay) return null;

  return (
    <section
      id="latest-essay"
      className="lg:hidden relative min-h-screen bg-bg-primary text-text-primary container-x pt-12 pb-32 border-t border-rule"
    >
      <div className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
          Latest essay
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim text-right">
          {formattedDate}
        </p>
      </div>

      <Link
        href={`/thoughts/${essay.slug}`}
        prefetch={true}
        className="group block active:opacity-80 transition-opacity"
      >
        {essay.cover && (
          <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 border border-rule">
            <Image
              src={essay.cover}
              alt={essay.title}
              fill
              sizes="100vw"
              className="object-cover group-active:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
          </div>
        )}

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
          I — Read now
        </p>

        <h2 className="font-serif text-3xl leading-[1.05] text-text-primary mb-4 group-active:text-accent transition-colors duration-300">
          {essay.title}
        </h2>

        {essay.subtitle && (
          <p className="font-serif text-lg italic text-text-muted leading-snug mb-5">
            {essay.subtitle}
          </p>
        )}

        {essay.excerpt && (
          <p className="font-sans text-sm text-text-muted leading-relaxed mb-6">
            {essay.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-rule">
          <div className="flex items-center gap-3">
            {essay.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
            {essay.readingTime} →
          </span>
        </div>
      </Link>

      <div className="mt-12 pt-8 border-t border-rule flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
          More essays
        </p>
        <Link
          href="/thoughts"
          prefetch={true}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent active:text-accent-hover"
        >
          View archive →
        </Link>
      </div>
    </section>
  );
}