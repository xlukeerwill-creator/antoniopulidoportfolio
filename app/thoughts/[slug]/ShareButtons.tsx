"use client";
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-primary hover:text-accent transition-colors"
      >
        LinkedIn
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-primary hover:text-accent transition-colors"
      >
        X / Twitter
      </a>

      <button
        onClick={copyLink}
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-primary hover:text-accent transition-colors"
      >
        Copy Link
      </button>

    </div>
  );
}