import Link from "next/link";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects · ผลงาน",
  description: "Things I've built — production work, side quests, experiments.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between border-b border-rule pb-5">
        <div className="space-y-1">
          <Eyebrow>The catalogue · สารบัญงาน</Eyebrow>
          <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
            Projects{" "}
            <span className="ml-2 font-sans text-xl not-italic text-muted-foreground md:text-2xl">
              ผลงาน
            </span>
          </h1>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {projects.length} entries
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
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
                  <span className="space-y-1">
                    <span className="block font-serif text-sm leading-[1.5] text-foreground">
                      {project.summary}
                    </span>
                    {project.summaryTh && (
                      <span className="block font-sans text-[12.5px] leading-[1.6] text-muted-foreground">
                        {project.summaryTh}
                      </span>
                    )}
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
                      ★ featured · งานเด่น
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
