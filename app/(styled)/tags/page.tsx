import Link from "next/link";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllTags } from "@/lib/blog";
import { tagTh } from "@/lib/tag-translations";

export const metadata: Metadata = {
  title: "Tags · แท็ก",
  description: "Browse posts by topic.",
};

export default function TagsPage() {
  const tags = getAllTags();
  const max = tags[0]?.count ?? 1;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <Eyebrow>The index · ดัชนี</Eyebrow>
        <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
          Tags{" "}
          <span className="ml-2 font-sans text-xl not-italic text-muted-foreground md:text-2xl">
            แท็ก
          </span>
        </h1>
      </header>

      {tags.length === 0 ? (
        <p className="font-sans text-sm text-muted-foreground">
          No tags yet. Add `tags: [...]` frontmatter to a post to see it here.
        </p>
      ) : (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4 border-y border-rule py-7">
          {tags.map(({ tag, count }) => {
            // size by frequency: 14px → ~28px on desktop, smaller on mobile via clamp
            const t = count / max;
            const size = 14 + Math.round(t * 14);
            return (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="hover-lift inline-flex items-baseline gap-1.5 hover:text-accent"
                style={{
                  fontSize: `${size}px`,
                  fontStyle: count > 4 ? "italic" : "normal",
                }}
              >
                <span className="font-serif">{tag}</span>
                <span
                  className="font-sans text-muted-foreground"
                  style={{ fontSize: `${Math.round(size * 0.55)}px` }}
                >
                  {tagTh(tag)}
                </span>
                <sup
                  className="font-mono not-italic text-muted-foreground"
                  style={{ fontSize: `${Math.max(9, Math.round(size * 0.42))}px` }}
                >
                  {count}
                </sup>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
