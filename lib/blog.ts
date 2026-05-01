import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  titleTh?: string;
  date: string;
  excerpt?: string;
  excerptTh?: string;
  tags?: string[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: { minutes: number; words: number };
}

const WORDS_PER_MIN = 220;

function readingTime(content: string) {
  // Count Latin word-ish tokens + Thai chars / 6 (rough but stable for mixed text).
  const latin = (content.match(/[\p{L}\p{N}']+/gu) ?? []).length;
  const thai = (content.match(/[฀-๿]/g) ?? []).length;
  const words = latin + Math.ceil(thai / 6);
  return { minutes: Math.max(1, Math.round(words / WORDS_PER_MIN)), words };
}

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getPostSlugs(): string[] {
  return ensureDir().map((file) => file.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(BLOG_DIR, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const fm = data as Partial<PostFrontmatter>;

  return {
    slug: realSlug,
    title: fm.title ?? realSlug,
    titleTh: fm.titleTh,
    date: fm.date ?? new Date().toISOString(),
    excerpt: fm.excerpt,
    excerptTh: fm.excerptTh,
    tags: fm.tags,
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags?.includes(tag));
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// Find prev/next within the chronological list (used for j/k post navigation).
export function getAdjacentPosts(slug: string) {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
