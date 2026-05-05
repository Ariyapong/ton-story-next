import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllTags } from "@/lib/blog";
import { tagTh } from "@/lib/tag-translations";
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
    title: dict.page.tagsTitle,
    description: dict.page.tagsDesc,
    alternates: {
      canonical: canonicalFor("/tags", lang),
      languages: hreflangAlternates("/tags"),
    },
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function TagsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const tags = getAllTags();
  const max = tags[0]?.count ?? 1;

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <Eyebrow>{dict.eyebrow.tagIndex}</Eyebrow>
        <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
          {dict.page.tagsTitle}
        </h1>
      </header>

      {tags.length === 0 ? (
        <p className="font-sans text-sm text-muted-foreground">
          {dict.empty.tags}
        </p>
      ) : (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-4 border-y border-rule py-7">
          {tags.map(({ tag, count }) => {
            // size by frequency: 14px → ~28px on desktop, smaller on mobile via clamp
            const t = count / max;
            const size = 14 + Math.round(t * 14);
            const label = lang === "th" ? tagTh(tag) : tag;
            return (
              <Link
                key={tag}
                href={localizeHref(`/tags/${encodeURIComponent(tag)}`, lang)}
                className="hover-lift inline-flex items-baseline gap-1.5 hover:text-accent"
                style={{
                  fontSize: `${size}px`,
                  fontStyle: count > 4 ? "italic" : "normal",
                }}
              >
                <span className={lang === "th" ? "font-sans" : "font-serif"}>
                  {label}
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
