import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
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
    date: fm.date ?? new Date().toISOString(),
    excerpt: fm.excerpt,
    tags: fm.tags,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
