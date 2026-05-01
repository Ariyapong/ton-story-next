import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Eyebrow } from "@/components/eyebrow";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="grid gap-10 md:grid-cols-[140px_minmax(0,1fr)_180px] md:gap-12">
      <aside className="md:order-1">
        <div className="md:sticky md:top-24 md:space-y-5">
          <Link
            href="/projects"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            ← All projects
          </Link>
          {project.year && (
            <div className="hidden md:block">
              <Eyebrow className="mb-1">Year · ปี</Eyebrow>
              <div className="font-mono text-[12px]">&rsquo;{project.year}</div>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div className="hidden md:block">
              <Eyebrow className="mb-1">Stack · เครื่องมือ</Eyebrow>
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
          {project.summaryTh && (
            <p className="font-sans text-[14px] leading-[1.7] text-muted-foreground">
              {project.summaryTh}
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
                Live ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-rule px-2.5 py-1 hover:text-accent"
              >
                Source ↗
              </a>
            )}
          </div>
        </header>
        <hr className="my-5 border-0 border-t border-rule" />
        <div className="prose-editorial max-w-none">
          <MDXRemote
            source={project.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>

      <aside className="md:order-3" />
    </article>
  );
}
