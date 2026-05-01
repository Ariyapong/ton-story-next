import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";
import { tagTh } from "@/lib/tag-translations";

type Params = { tag: string };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} · ${tagTh(decoded)}`,
    description: `Posts tagged #${decoded}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-rule pb-5">
        <Link
          href="/tags"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← All tags · แท็กทั้งหมด
        </Link>
        <Eyebrow>
          Filtered · กรอง: <span className="text-foreground">#{decoded}</span>{" "}
          <span className="text-foreground">· {tagTh(decoded)}</span>
        </Eyebrow>
        <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
          #{decoded}
        </h1>
        <p className="font-mono text-[11px] text-muted-foreground">
          {posts.length} entr{posts.length === 1 ? "y" : "ies"}
        </p>
      </header>

      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              data-post-row
              className="hover-lift grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-4 hover:text-accent focus:text-accent focus:outline-none md:grid-cols-[100px_1fr_120px]"
            >
              <span className="order-2 font-mono text-[11px] text-muted-foreground md:order-1">
                {formatDateMono(post.date)}
              </span>
              <span className="order-1 col-span-2 md:order-2 md:col-span-1">
                <span className="block font-serif text-lg leading-[1.25]">
                  {post.title}
                </span>
                {post.titleTh && (
                  <span className="block font-sans text-[14px] leading-[1.45] text-muted-foreground">
                    · {post.titleTh}
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
    </div>
  );
}
