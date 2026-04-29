import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date?: string;
  stack?: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

function ensureDir() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getProjectSlugs(): string[] {
  return ensureDir().map((file) => file.replace(/\.mdx?$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(PROJECTS_DIR, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const fm = data as Partial<ProjectFrontmatter>;

  return {
    slug: realSlug,
    title: fm.title ?? realSlug,
    summary: fm.summary ?? "",
    date: fm.date,
    stack: fm.stack,
    link: fm.link,
    repo: fm.repo,
    featured: fm.featured,
    content,
  };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const ad = a.date ?? "";
      const bd = b.date ?? "";
      return ad < bd ? 1 : -1;
    });
}
