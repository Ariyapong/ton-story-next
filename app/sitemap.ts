import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

// Each logical page is emitted twice: once as the bare canonical URL (EN)
// and once with the /th/ prefix (TH canonical). Each entry carries hreflang
// alternates so crawlers treat them as a language-pair group.
//
// /bio is intentionally EN-only (the /th/bio courtesy route exists but its
// content is identical English with a notice — not a true Thai variant).
function langPair(path: string) {
  const en = path === "/" ? "/" : path;
  const th = path === "/" ? "/th" : `/th${path}`;
  return {
    languages: {
      en: `${SITE_URL}${en}`,
      th: `${SITE_URL}${th}`,
      "x-default": `${SITE_URL}${en}`,
    },
    enUrl: `${SITE_URL}${en}`,
    thUrl: `${SITE_URL}${th}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  type Spec = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: Date };

  const pages: Spec[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tags", priority: 0.5, changeFrequency: "monthly" },
  ];

  for (const post of getAllPosts()) {
    pages.push({
      path: `/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: "yearly",
      lastModified: new Date(post.date),
    });
  }

  for (const project of getAllProjects("en")) {
    pages.push({
      path: `/projects/${project.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: project.date ? new Date(project.date) : now,
    });
  }

  for (const { tag } of getAllTags()) {
    pages.push({
      path: `/tags/${encodeURIComponent(tag)}`,
      priority: 0.4,
      changeFrequency: "monthly",
    });
  }

  const bilingual: MetadataRoute.Sitemap = pages.flatMap((p) => {
    const { languages, enUrl, thUrl } = langPair(p.path);
    const base = {
      lastModified: p.lastModified ?? now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages },
    };
    return [
      { ...base, url: enUrl },
      { ...base, url: thUrl },
    ];
  });

  // Bio is EN-only — no Thai alternate.
  const bio: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/bio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [...bilingual, ...bio];
}
