import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Things I&apos;ve built.</p>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="rounded-lg border border-border bg-card p-5 hover:bg-accent/40 transition-colors"
            >
              <Link href={`/projects/${project.slug}`} className="block space-y-2">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-muted-foreground">{project.summary}</p>
                {project.stack && project.stack.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tag) => (
                      <li
                        key={tag}
                        className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
