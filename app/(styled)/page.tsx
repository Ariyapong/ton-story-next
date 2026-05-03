import Link from "next/link";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { StickyNote } from "@/components/sticky-note";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ariyapong Wongmaneerat (Tony) — senior software developer in Bangkok.",
};

// Type "ttt" anywhere → a tiny coffee cup appears next to the quote.
// Mirrors the egg on /bio; same trigger, same payload, just on this page.
const easterEggScript = `
  (function () {
    var buf = '';
    document.addEventListener('keydown', function (e) {
      if (e.key && e.key.length === 1) buf = (buf + e.key).slice(-3);
      if (buf === 'ttt') {
        var q = document.getElementById('quote');
        if (q && !document.getElementById('cup')) {
          var s = document.createElement('span');
          s.id = 'cup';
          s.textContent = ' ☕';
          q.appendChild(s);
        }
      }
    });
  })();
`;

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featured = getAllProjects().filter((p) => p.featured);

  return (
    <div className="relative space-y-12">
      <StickyNote
        hint={
          <>
            (....: try typing <code className="font-mono">ttt</code> 😎)
          </>
        }
      >
        ☕ pour another.
      </StickyNote>

      <section className="space-y-3">
        <Eyebrow>Vol. 01 · Bangkok กรุงเทพฯ · 2026</Eyebrow>
        <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-6xl">
          Hi, I&rsquo;m <em className="italic">Ton</em>.{" "}
          <span className="text-muted-foreground">/</span>{" "}
          <span className="font-sans">สวัสดี ผมต้น</span>
        </h1>
        <p className="font-sans text-base text-muted-foreground md:text-lg">
          Senior software developer in Bangkok · นักพัฒนาซอฟต์แวร์อาวุโส อยู่ที่กรุงเทพฯ
        </p>
      </section>

      <section className="grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div className="space-y-5">
          <p className="dropcap font-serif text-lg leading-relaxed text-foreground">
            Senior software developer in Bangkok. I build for the web — frontend
            mostly, but I&rsquo;ll wander wherever the work goes. This page is
            the index; the writing is where I really live.
          </p>
          <p className="font-sans text-[15px] leading-[1.78] text-muted-foreground">
            ผมเขียนโค้ดสำหรับเว็บ — ส่วนใหญ่เป็นฝั่ง frontend แต่ก็ตามงานไปได้ทุกที่ที่จำเป็น หน้านี้เป็นเพียงสารบัญ Blog คือที่ที่ผมอยู่จริง ๆ
            ส่วนใหญ่เกี่ยวกับ Javascript, TypeScript, React.js, React Frameworks และเรื่องเล็ก ๆ น้อย ๆ
            ที่ผมเรียนรู้
          </p>
          <dl className="grid grid-cols-2 gap-y-3 border-t border-rule pt-5 font-sans text-sm">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Role · ตำแหน่ง
            </dt>
            <dd>Senior Software Developer</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Based · อยู่ที่
            </dt>
            <dd>Bangkok, Thailand · กรุงเทพฯ</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Stack · เครื่องมือ
            </dt>
            <dd>Javascript, TypeScript, React.js, React Frameworks, Tailwind, MDX</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Find me · ติดต่อ
            </dt>
            <dd className="space-x-3">
              <a
                href="https://github.com/Ariyapong"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                github
              </a>
              <a
                href="mailto:ariyapong.ton@aritoton.com"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                email
              </a>
              {/* medium like in bio page*/}
              <a
                href="https://medium.com/@ariyapong"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                medium
              </a>
            </dd>
          </dl>
        </div>

        <aside className="border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
          <Eyebrow>From the desk · จากโต๊ะทำงาน</Eyebrow>
          <blockquote
            id="quote"
            className="mt-3 font-serif text-2xl italic leading-[1.3]"
          >
            &ldquo;When we lose our principle, we invite chaos.&rdquo;
          </blockquote>
          <p className="mt-2 font-sans text-sm leading-[1.55] text-muted-foreground">
            เมื่อใดที่เราละทิ้งหลักการ เมื่อนั้นเราเชิญความวุ่นวายเข้ามา
          </p>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            — house rule · กฎประจำบ้าน
          </div>
        </aside>
      </section>

      <section className="grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-medium italic">
              Recent dispatches · บันทึกล่าสุด
            </h2>
            <Link
              href="/blog"
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              All →
            </Link>
          </div>
          <ol className="border-t border-rule">
            {recentPosts.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  data-post-row
                  className="hover-lift grid grid-cols-[34px_1fr_64px] items-baseline gap-3 border-b border-dashed border-rule py-3 hover:text-accent focus:text-accent focus:outline-none"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    №{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="space-y-0.5">
                    <span className="block font-serif text-base leading-[1.25]">
                      {p.title}
                    </span>
                    {p.titleTh && (
                      <span className="block font-sans text-[13px] leading-[1.5]">
                        {p.titleTh}
                      </span>
                    )}
                    {p.excerpt && (
                      <span className="block font-sans text-[11px] text-muted-foreground">
                        {p.excerpt}
                      </span>
                    )}
                  </span>
                  <span className="text-right font-mono text-[10px] text-muted-foreground">
                    {p.readingTime.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <Eyebrow className="mb-3">Featured work · ผลงานเด่น</Eyebrow>
          <ul className="border-t border-rule">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="hover-lift flex border-b border-rule py-3 hover:text-accent"
                >
                  <span
                    className="mr-4 w-1 self-stretch bg-stripe"
                    aria-hidden="true"
                  />
                  <span className="space-y-1">
                    <span className="block font-serif text-base font-medium">
                      {p.title}{" "}
                      {p.year && (
                        <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                          &rsquo;{p.year}
                        </span>
                      )}
                    </span>
                    <span className="block font-sans text-[12px] leading-[1.45] text-muted-foreground">
                      {p.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="border-t border-rule pt-10 font-sans text-sm leading-[1.7] text-muted-foreground">
        <Eyebrow className="mb-2">Footnote · เชิงอรรถ</Eyebrow>
        <p>
          Type <code className="font-mono">ttt</code> anywhere on this page,
          then look at the quote. Small joke for anyone paying attention.
          <br />
          ลองพิมพ์ <code className="font-mono">ttt</code> ที่ไหนก็ได้บนหน้านี้ แล้วดูที่คำพูด — เรื่องเล็ก ๆ สำหรับคนที่สังเกต
        </p>
        <p className="mt-3">
          Or type a drink — <code className="font-mono">coffee</code>,{" "}
          <code className="font-mono">tea</code>,{" "}
          <code className="font-mono">milk</code> — and the page shifts its mood.
          <br />
          หรือพิมพ์ชื่อเครื่องดื่ม — <code className="font-mono">coffee</code>,{" "}
          <code className="font-mono">tea</code>,{" "}
          <code className="font-mono">milk</code> — แล้วดูหน้าเปลี่ยนอารมณ์ตาม
        </p>
      </section>


      <script dangerouslySetInnerHTML={{ __html: easterEggScript }} />
    </div>
  );
}
