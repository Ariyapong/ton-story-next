import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const recentProjects = getAllProjects().slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Hi, I&apos;m Tony.</h1>
        <p className="max-w-2xl text-muted-foreground">
          I build software. This is where I share what I&apos;m working on and
          what I&apos;m thinking about. Have a look around — or get in touch.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent posts</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            All posts →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3 hover:bg-accent/40 -mx-2 px-2 rounded transition-colors"
                >
                  <span className="font-medium">{post.title}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            All projects →
          </Link>
        </div>
        {recentProjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {recentProjects.map((project) => (
              <li
                key={project.slug}
                className="rounded-lg border border-border bg-card p-5 hover:bg-accent/40 transition-colors"
              >
                <Link href={`/projects/${project.slug}`} className="block space-y-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
