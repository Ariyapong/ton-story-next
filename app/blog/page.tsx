import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and writing.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">Notes and writing.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border pb-6 last:border-b-0">
              <Link href={`/blog/${post.slug}`} className="block space-y-1.5">
                <h2 className="text-lg font-semibold group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
