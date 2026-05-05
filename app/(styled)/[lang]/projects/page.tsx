import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllProjects } from "@/lib/projects";
import {
  canonicalFor,
  getDict,
  hreflangAlternates,
  isLang,
  localizeHref,
  ogLocale,
} from "@/lib/i18n";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.page.projectsTitle,
    description: dict.page.projectsDesc,
    alternates: {
      canonical: canonicalFor("/projects", lang),
      languages: hreflangAlternates("/projects"),
    },
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const projects = getAllProjects(lang);

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between border-b border-rule pb-5">
        <div className="space-y-2">
          <Eyebrow>{dict.eyebrow.catalogue}</Eyebrow>
          <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
            {dict.page.projectsTitle}
          </h1>
          <p className="font-sans text-sm leading-[1.55] text-muted-foreground">
            {dict.page.projectsTagline}
          </p>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {dict.counter.entries(projects.length)}
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">{dict.empty.projects}</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            return (
              <li key={project.slug}>
                <Link
                  href={localizeHref(`/projects/${project.slug}`, lang)}
                  className="hover-lift group flex h-full overflow-hidden rounded-md border border-rule bg-card transition-colors hover:border-accent"
                >
                  <span
                    className="w-1.5 self-stretch bg-stripe transition-colors group-hover:bg-accent"
                    aria-hidden="true"
                  />
                  <span className="flex flex-1 flex-col gap-3 p-5">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl font-medium leading-[1.2]">
                        {project.title}
                      </span>
                      {project.year && (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          &rsquo;{project.year}
                        </span>
                      )}
                    </span>
                    <span className="block font-serif text-sm leading-[1.5] text-foreground">
                      {project.summary}
                    </span>
                    {project.stack && project.stack.length > 0 && (
                      <span className="mt-auto flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-muted-foreground">
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-rule px-2 py-0.5"
                          >
                            {s}
                          </span>
                        ))}
                      </span>
                    )}
                    {project.featured && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        {dict.card.featured}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
