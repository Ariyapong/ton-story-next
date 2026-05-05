// Shared markup for /bio (EN) and /th/bio (TH chrome → same EN content + a notice).
// Bio is intentionally EN-only and lives outside the (styled) [lang] tree so it
// keeps its raw, unstyled aesthetic. The lang prop only changes the top-of-page
// notice and the bottom nav targets — body copy stays English.

import { localizeHref, type Lang } from "@/lib/i18n";

const easterEggScript = `
  // After 8s, the quote gets a single inline style. Nothing else. Shhh.
  setTimeout(function () {
    var q = document.getElementById('quote');
    if (q) q.style.fontFamily = 'cursive';
  }, 8000);
  // Type "ttt" anywhere → a tiny coffee cup appears next to the quote.
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

export function BioContent({ lang }: { lang: Lang }) {
  return (
    <>
      {lang === "th" && (
        <p>
          <small lang="en">English only</small>
          {" · "}
          <small lang="th">ภาษาอังกฤษเท่านั้น</small>
        </p>
      )}
      <h1 lang="en">Hello there, welcome to my website</h1>
      <h2>My name is Ariyapong Wimolnoch</h2>
      <p>
        <b>Nickname:</b> Ton (or Tony)
      </p>
      <p>
        <b>Role:</b> Software Developer
      </p>
      <p>
        <b>Based in:</b> Bangkok, Thailand
      </p>
      <p>
        <b>Currently at:</b> AXONS Tech (CPF)
      </p>

      <h2>What I do</h2>
      <p>
        I build software for the web. Frontend mostly, but I&apos;ll happily wander
        into backend, infra, or whatever the work needs. <br />Lately: Javascript,
        TypeScript, React.js related Framework, Tailwind, and a healthy amount of MDX.
      </p>

      <h2>What I write about</h2>
      <ul>
        <li>Tech &amp; programming notes</li>
        <li>Work — what I&apos;m building, what&apos;s breaking</li>
        <li>Health &amp; everyday discipline</li>
        <li>Hobbies, side quests, miscellany</li>
      </ul>

      <h2>A quote I keep coming back to</h2>
      <blockquote id="quote">
        &ldquo;When we lose our principle, we invite chaos.&rdquo;
      </blockquote>

      <h2>Find me</h2>
      <ul>
        <li>
          GitHub:{" "}
          <a href="https://github.com/Ariyapong">github.com/Ariyapong</a>
        </li>
        <li>
          Medium:{" "}
          <a href="https://medium.com/@arthony">medium.com/@arthony</a>
        </li>
        <li>
          Email:{" "}
          <a href="mailto:ariyapong.ton@aritoton.com">ariyapong.ton@aritoton.com</a>
        </li>
      </ul>

      <hr />

      <p>
        <small>
          Yes, This page is beautifully crafted with ❤️ <br />
          See other pages here.{" "}
          {/* Hard nav (plain <a>) so the styled CSS loads cleanly when leaving the unstyled bio. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href={localizeHref("/blog", lang)}>Read the blog</a> ·{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href={localizeHref("/projects", lang)}>See projects</a> ·{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href={localizeHref("/", lang)}>Home (about)</a>
        </small>
      </p>

      <script dangerouslySetInnerHTML={{ __html: easterEggScript }} />
    </>
  );
}
