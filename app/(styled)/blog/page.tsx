import Link from "next/link";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllPosts } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog · บล็อก",
  description: "Notes and writing in English and Thai.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between border-b border-rule pb-5">
        <div className="space-y-1">
          <Eyebrow>The archive · คลังบทความ</Eyebrow>
          <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
            Blog{" "}
            <span className="ml-2 font-sans text-xl not-italic text-muted-foreground md:text-2xl">
              บล็อก
            </span>
          </h1>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {posts.length} entries · sorted ↓
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ol>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                data-post-row
                className="hover-lift grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors hover:text-accent focus:text-accent focus:outline-none md:grid-cols-[100px_1fr_120px]"
              >
                <span className="order-2 font-mono text-[11px] text-muted-foreground md:order-1">
                  {formatDateMono(post.date)}
                </span>
                <span className="order-1 col-span-2 space-y-1.5 md:order-2 md:col-span-1">
                  <span className="block font-serif text-xl leading-[1.2] md:text-[1.35rem]">
                    {post.title}
                  </span>
                  {post.titleTh && (
                    <span className="block font-sans text-[15px] leading-[1.45]">
                      {post.titleTh}
                    </span>
                  )}
                  {post.excerpt && (
                    <span className="block font-sans text-[12px] leading-[1.55] text-muted-foreground">
                      {post.excerpt}
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <span className="mt-1 flex flex-wrap gap-2.5 font-mono text-[10px] text-muted-foreground">
                      {post.tags.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </span>
                  )}
                </span>
                <span className="order-3 text-right font-mono text-[10px] text-muted-foreground">
                  {formatReadingTime(post.readingTime.minutes)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
