import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackToThoughts from "./BackToThoughts";
import ArticleAnimations from "./ArticleAnimations";
import ShareButtons from "./ShareButtons";
import { getThoughtBySlug, getAllThoughtSlugs, formatDate } from "@/lib/thoughts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllThoughtSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);
  if (!thought) return { title: "Not found" };

  return {
    title: thought.title,
    description: thought.excerpt || thought.subtitle,
    openGraph: {
      title: thought.title,
      description: thought.excerpt || thought.subtitle,
      type: "article",
      publishedTime: thought.date,
      tags: thought.tags,
      images: thought.cover
        ? [{ url: thought.cover, width: 1200, height: 630, alt: thought.title }]
        : [{ url: "/images/antonio-hero.png", width: 1200, height: 630, alt: "Antonio Pulido Sáez" }],
    },
    twitter: {
      card: "summary_large_image",
      title: thought.title,
      description: thought.excerpt || thought.subtitle,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) notFound();

  const shareUrl = "https://antoniopulidosaez.com/thoughts/" + slug;

  return (
    <>
      <BackToThoughts />
      <main className="min-h-screen bg-bg-primary text-text-primary">
        <ArticleAnimations />

        <article className="container-x pt-20 md:pt-24 pb-20">
          <div
            className="grid grid-cols-2 items-baseline pb-4 border-b border-rule mb-10 md:mb-16"
            data-article-el
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted">
                {formatDate(thought.date)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">·</span>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-text-muted">
                {thought.readingTime}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3 flex-wrap">
              {thought.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1
            className="font-serif text-display-sm md:text-display-md leading-[0.95] max-w-5xl mb-8 md:mb-12"
            data-article-el
          >
            {thought.title}
          </h1>

          {thought.subtitle && (
            <p
              className="font-serif italic text-xl md:text-2xl lg:text-3xl text-text-muted max-w-3xl leading-[1.3] mb-12 md:mb-20"
              data-article-el
            >
              {thought.subtitle}
            </p>
          )}

          {thought.cover && (
            <div
              className="relative w-full aspect-[16/9] mb-12 md:mb-20 overflow-hidden"
              data-article-el
            >
              <Image
                src={thought.cover}
                alt={thought.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="article-body max-w-3xl mx-auto font-serif text-lg md:text-xl leading-[1.6] text-text-primary"
            dangerouslySetInnerHTML={{ __html: thought.contentHtml }}
            data-article-el
          />

          <div className="max-w-3xl mx-auto mt-20 md:mt-32 pt-8 border-t border-rule" data-article-el>
            <ShareButtons title={thought.title} url={shareUrl} />
          </div>

          <div className="max-w-3xl mx-auto mt-12 md:mt-16 flex justify-center" data-article-el>
            <Link
              href="/thoughts"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted hover:text-accent transition-colors duration-500"
            >
              <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">←</span>
              All essays
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}