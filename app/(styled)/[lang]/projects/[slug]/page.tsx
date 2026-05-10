import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Eyebrow } from "@/components/eyebrow";
import { mdxComponents } from "@/components/mdx";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import {
  LANGS,
  canonicalFor,
  getDict,
  hreflangAlternates,
  isLang,
  localizeHref,
  ogLocale,
} from "@/lib/i18n";

type Params = { lang: string; slug: string };

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    getProjectSlugs().map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const project = getProjectBySlug(slug, lang);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const url = canonicalFor(path, lang);
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url,
      locale: ogLocale(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const project = getProjectBySlug(slug, lang);
  if (!project) notFound();
  const dict = getDict(lang);

  return (
    <article className="grid gap-10 md:grid-cols-[140px_minmax(0,1fr)_180px] md:gap-12">
      <aside className="md:order-1">
        <div className="md:sticky md:top-24 md:space-y-5">
          <Link
            href={localizeHref("/projects", lang)}
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            {dict.nav.allProjects}
          </Link>
          {project.year && (
            <div className="hidden md:block">
              <Eyebrow className="mb-1">{dict.eyebrow.year}</Eyebrow>
              <div className="font-mono text-[12px]">&rsquo;{project.year}</div>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div className="hidden md:block">
              <Eyebrow className="mb-1">{dict.eyebrow.stack}</Eyebrow>
              <ul className="space-y-0.5 font-mono text-[12px]">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <div className="max-w-[640px] md:order-2">
        <header className="space-y-2">
          <h1 className="font-serif text-3xl font-medium leading-[1.05] tracking-tight md:text-[2.6rem]">
            {project.title}
          </h1>
          <p className="font-serif text-base leading-[1.55] text-muted-foreground">
            {project.summary}
          </p>
          {project.fallback && (
            <p className="rounded border border-rule bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.project.thaiComing}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10px]">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-rule px-2.5 py-1 hover:text-accent"
              >
                {dict.project.live}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-rule px-2.5 py-1 hover:text-accent"
              >
                {dict.project.source}
              </a>
            )}
          </div>
        </header>
        <hr className="my-5 border-0 border-t border-rule" />
        <div className="prose-editorial max-w-none">
          <MDXRemote
            source={project.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>

      <aside className="md:order-3" />
    </article>
  );
}
