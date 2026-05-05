import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Lang } from "@/lib/i18n";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

// Files live as `<slug>.<lang>.mdx` (e.g. class-peek.en.mdx, class-peek.th.mdx).
// Each per-language file owns its own frontmatter — title and summary in that
// language. Loading falls back to .en.mdx when a language file is missing,
// and the consumer renders a "translation coming" notice via the `fallback`
// flag returned on the Project.
const LANG_RE = /\.(en|th)\.mdx?$/;

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date?: string;
  year?: string;
  stack?: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
  fallback: boolean;
}

function listFiles(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs.readdirSync(PROJECTS_DIR).filter((f) => LANG_RE.test(f));
}

export function getProjectSlugs(): string[] {
  const slugs = new Set<string>();
  for (const file of listFiles()) {
    slugs.add(file.replace(LANG_RE, ""));
  }
  return Array.from(slugs);
}

function readProjectFile(
  slug: string,
  lang: Lang,
): { fm: Partial<ProjectFrontmatter>; content: string } | null {
  for (const ext of ["mdx", "md"] as const) {
    const full = path.join(PROJECTS_DIR, `${slug}.${lang}.${ext}`);
    if (fs.existsSync(full)) {
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      return { fm: data as Partial<ProjectFrontmatter>, content };
    }
  }
  return null;
}

export function getProjectBySlug(slug: string, lang: Lang): Project | null {
  const realSlug = slug.replace(LANG_RE, "");
  let entry = readProjectFile(realSlug, lang);
  let fallback = false;
  if (!entry && lang !== "en") {
    entry = readProjectFile(realSlug, "en");
    fallback = true;
  }
  if (!entry) return null;
  const fm = entry.fm;
  return {
    slug: realSlug,
    title: fm.title ?? realSlug,
    summary: fm.summary ?? "",
    date: fm.date,
    year: fm.year ?? (fm.date ? fm.date.slice(2, 4) : undefined),
    stack: fm.stack,
    link: fm.link,
    repo: fm.repo,
    featured: fm.featured,
    content: entry.content,
    fallback,
  };
}

export function getAllProjects(lang: Lang): Project[] {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug, lang))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const ad = a.date ?? "";
      const bd = b.date ?? "";
      return ad < bd ? 1 : -1;
    });
}
