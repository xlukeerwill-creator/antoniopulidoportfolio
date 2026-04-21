import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const thoughtsDirectory = path.join(process.cwd(), "content/thoughts");

export type ThoughtMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  pullquote?: string;
  readingTime: string;
};

export type Thought = ThoughtMeta & {
  contentHtml: string;
};

// Helper: extrae el slug del nombre del archivo
// "2026-04-21-the-lawyer-learning-to-code.md" → "the-lawyer-learning-to-code"
function fileNameToSlug(fileName: string): string {
  const withoutExt = fileName.replace(/\.md$/, "");
  // Si el archivo empieza con fecha YYYY-MM-DD-, la quitamos del slug
  return withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

// Devuelve la metadata de todos los artículos, ordenados por fecha descendente
export function getAllThoughtsMeta(): ThoughtMeta[] {
  if (!fs.existsSync(thoughtsDirectory)) return [];

  const fileNames = fs.readdirSync(thoughtsDirectory).filter((f) => f.endsWith(".md"));

  const allThoughts = fileNames.map((fileName) => {
    const slug = fileNameToSlug(fileName);
    const fullPath = path.join(thoughtsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "Untitled",
      subtitle: data.subtitle || "",
      date: data.date || "",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      cover: data.cover || undefined,
      pullquote: data.pullquote || undefined,
      readingTime: stats.text, // p.ej. "3 min read"
    } as ThoughtMeta;
  });

  // Ordenar por fecha descendente (los más recientes primero)
  return allThoughts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Devuelve un artículo completo por su slug (metadata + HTML renderizado)
export async function getThoughtBySlug(slug: string): Promise<Thought | null> {
  if (!fs.existsSync(thoughtsDirectory)) return null;

  const fileNames = fs.readdirSync(thoughtsDirectory).filter((f) => f.endsWith(".md"));
  const fileName = fileNames.find((f) => fileNameToSlug(f) === slug);

  if (!fileName) return null;

  const fullPath = path.join(thoughtsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || "Untitled",
    subtitle: data.subtitle || "",
    date: data.date || "",
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    cover: data.cover || undefined,
    pullquote: data.pullquote || undefined,
    readingTime: stats.text,
    contentHtml,
  };
}

// Devuelve todos los slugs disponibles (para generateStaticParams)
export function getAllThoughtSlugs(): string[] {
  if (!fs.existsSync(thoughtsDirectory)) return [];
  const fileNames = fs.readdirSync(thoughtsDirectory).filter((f) => f.endsWith(".md"));
  return fileNames.map((f) => fileNameToSlug(f));
}

// Formatea la fecha: "2026-04-21" → "21 Apr 2026"
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}