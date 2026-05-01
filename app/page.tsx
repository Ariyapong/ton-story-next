// The unstyled bio.
// Loaded under the minimal root layout — no globals.css, no fonts, no Tailwind.
// What you see is the raw browser default. That's the joke.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tony — Bio",
  description: "Ariyapong Wongmaneerat (Tony) — Senior Software Developer, Bangkok.",
};

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

export default function UnstyledBioPage() {
  return (
    <>
      <h1>Ariyapong Wongmaneerat</h1>
      <p>
        <b>Nickname:</b> Tony (or Ton)
      </p>
      <p>
        <b>Role:</b> Senior Software Developer
      </p>
      <p>
        <b>Based in:</b> Bangkok, Thailand
      </p>
      <p>
        <b>Currently at:</b> [Work Company]
      </p>

      <h2>What I do</h2>
      <p>
        I build software for the web. Frontend mostly, but I&apos;ll happily wander
        into backend, infra, or whatever the work needs. Lately: Next.js,
        TypeScript, Tailwind, and a healthy amount of MDX.
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
          Email:{" "}
          <a href="mailto:ariyapongw.ton@gmail.com">ariyapongw.ton@gmail.com</a>
        </li>
      </ul>

      <hr />

      <p>
        <small>
          Yes, this page has zero CSS on purpose. Every other page is properly
          designed, I promise.{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/blog">Read the blog</a> ·{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/projects">See projects</a> · <a href="/about">About</a>
        </small>
      </p>

      <p>
        <small>
          <i>(View source. The whole document is one tiny file. That&apos;s the joke.)</i>
        </small>
      </p>

      <script dangerouslySetInnerHTML={{ __html: easterEggScript }} />
    </>
  );
}
