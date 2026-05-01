import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Eyebrow } from "@/components/eyebrow";
import { ReadingProgress } from "@/components/reading-progress";
import { getAdjacentPosts, getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const related = getAllPosts()
    .filter((p) => p.slug !== slug && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="grid gap-10 md:grid-cols-[140px_minmax(0,1fr)_160px] md:gap-12">
        <aside className="md:order-1">
          <div className="md:sticky md:top-24 md:space-y-5">
            {/* Mobile chip row */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-muted-foreground md:hidden">
              <span className="rounded-full border border-rule px-2 py-0.5">
                {formatDateMono(post.date)}
              </span>
              <span className="rounded-full border border-rule px-2 py-0.5">
                {formatReadingTime(post.readingTime.minutes)}
              </span>
              {post.tags?.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className="rounded-full border border-rule px-2 py-0.5 hover:text-accent"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">Filed · หมวด</Eyebrow>
              <div className="font-mono text-[12px] leading-7">
                {post.tags?.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${encodeURIComponent(t)}`}
                    className="block hover:text-accent"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">Published · เผยแพร่</Eyebrow>
              <div className="font-mono text-[12px]">
                {formatDateMono(post.date)}
              </div>
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">Reading · เวลาอ่าน</Eyebrow>
              <div className="font-mono text-[12px]">
                {formatReadingTime(post.readingTime.minutes)}
              </div>
            </div>
            <div className="hidden md:block">
              <Link
                href="/blog"
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                ← All posts
              </Link>
            </div>
          </div>
        </aside>

        <div className="max-w-[640px] md:order-2">
          <Link
            href="/blog"
            className="mb-3 inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground md:hidden"
          >
            ← All posts · บทความทั้งหมด
          </Link>
          <header className="space-y-2">
            <h1 className="font-serif text-3xl font-medium leading-[1.05] tracking-tight md:text-[2.6rem]">
              {post.title}
            </h1>
            {post.titleTh && (
              <h2 className="font-sans text-lg font-medium leading-[1.3] text-muted-foreground md:text-2xl">
                {post.titleTh}
              </h2>
            )}
          </header>
          <hr className="my-5 border-0 border-t border-rule" />
          <div className="prose-editorial max-w-none">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-rule pt-5 font-mono text-[10px] text-muted-foreground">
            <CopyLink slug={post.slug} />
            <span className="ml-auto">j ↑ k ↓</span>
          </div>

          <nav className="mt-6 grid gap-3 border-t border-rule pt-5 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="hover-lift block rounded border border-rule p-3 hover:text-accent"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  ← Older · เก่ากว่า
                </div>
                <div className="mt-1 font-serif text-sm">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="hover-lift block rounded border border-rule p-3 text-right hover:text-accent"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Newer · ใหม่กว่า →
                </div>
                <div className="mt-1 font-serif text-sm">{next.title}</div>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="md:order-3">
          <Eyebrow className="mb-2">Related · ที่เกี่ยวข้อง</Eyebrow>
          <ul className="border-t border-rule">
            {related.length === 0 && (
              <li className="py-3 font-sans text-xs text-muted-foreground">
                No related posts yet.
              </li>
            )}
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  data-post-row
                  className="hover-lift block border-b border-rule py-3 hover:text-accent focus:text-accent focus:outline-none"
                >
                  <div className="font-serif text-[13px] leading-[1.3]">
                    {p.title}
                  </div>
                  {p.titleTh && (
                    <div className="font-sans text-[12px] leading-[1.4]">
                      {p.titleTh}
                    </div>
                  )}
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {formatDateMono(p.date)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </>
  );
}

function CopyLink({ slug }: { slug: string }) {
  const id = `copy-${slug}`;
  const script = `(function(){var b=document.getElementById('${id}');if(!b)return;b.addEventListener('click',function(){var u=window.location.origin+'/blog/${slug}';if(navigator.clipboard){navigator.clipboard.writeText(u);}var t=b.querySelector('span');if(t){var o=t.textContent;t.textContent='✓ copied';setTimeout(function(){t.textContent=o;},1400);}});})();`;
  return (
    <>
      <button
        id={id}
        type="button"
        className="rounded border border-rule px-2.5 py-1 hover:text-accent"
      >
        <span>↗ copy link</span>
      </button>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
