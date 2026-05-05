import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";
import { tagTh } from "@/lib/tag-translations";
import {
  LANGS,
  canonicalFor,
  getDict,
  hreflangAlternates,
  isLang,
  localizeHref,
  ogLocale,
} from "@/lib/i18n";

type Params = { lang: string; tag: string };

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    getAllTags().map(({ tag }) => ({ lang, tag: encodeURIComponent(tag) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, tag } = await params;
  if (!isLang(lang)) return {};
  const decoded = decodeURIComponent(tag);
  const label = lang === "th" ? tagTh(decoded) : decoded;
  const path = `/tags/${encodeURIComponent(decoded)}`;
  return {
    title: `#${label}`,
    description:
      lang === "th"
        ? `บทความที่ติดแท็ก #${label}`
        : `Posts tagged #${label}.`,
    alternates: {
      canonical: canonicalFor(path, lang),
      languages: hreflangAlternates(path),
    },
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, tag } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();
  const tagLabel = lang === "th" ? tagTh(decoded) : decoded;

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-rule pb-5">
        <Link
          href={localizeHref("/tags", lang)}
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          {dict.nav.allTags}
        </Link>
        <Eyebrow>
          {dict.eyebrow.filtered}:{" "}
          <span className="text-foreground">#{tagLabel}</span>
        </Eyebrow>
        <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
          #{tagLabel}
        </h1>
        <p className="font-mono text-[11px] text-muted-foreground">
          {dict.counter.entriesPlural(posts.length)}
        </p>
      </header>

      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={localizeHref(`/blog/${post.slug}`, lang)}
              data-post-row
              className="hover-lift grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-4 hover:text-accent focus:text-accent focus:outline-none md:grid-cols-[100px_1fr_120px]"
            >
              <span className="order-2 flex items-baseline gap-2 font-mono text-[11px] text-muted-foreground md:order-1">
                <span>{formatDateMono(post.date)}</span>
                <span className="rounded-full border border-rule px-1.5 py-px text-[9px] uppercase tracking-wide">
                  {post.lang.toUpperCase()}
                </span>
              </span>
              <span
                lang={post.lang}
                className="order-1 col-span-2 md:order-2 md:col-span-1"
              >
                <span className="block font-serif text-lg leading-[1.25]">
                  {post.title}
                </span>
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
