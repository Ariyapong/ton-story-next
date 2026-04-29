# Writing blog posts

Everything you need to know to write, preview, and ship articles on this site.

---

## TL;DR

1. Create a file `content/blog/<slug>.mdx`
2. Add frontmatter at the top
3. Write the post in Markdown (MDX syntax — so you can drop in JSX too)
4. `pnpm dev` and visit `http://localhost:5174/blog/<slug>`
5. The list at `/blog` and the home page pick it up automatically

---

## File location and slug

- Posts live in **`content/blog/`** at the project root
- One post = one `.mdx` file
- The **filename (without extension) becomes the URL slug**
  - `content/blog/why-i-rebuilt-my-site.mdx` → `/blog/why-i-rebuilt-my-site`
- Use kebab-case, ASCII only, no spaces — that's what shows up in the URL

You can also use `.md` (no JSX), but `.mdx` is the default.

---

## Frontmatter reference

YAML block at the very top of the file, fenced by `---`. Order doesn't matter.

```mdx
---
title: "Why I rebuilt my site in 2026"
date: "2026-04-29"
excerpt: "After two years on a starter template, I tore it down and rebuilt the whole thing on Next 15. Here's what changed and why."
tags: ["meta", "next.js", "react"]
---
```

| Field      | Type       | Required | Notes |
|------------|------------|----------|-------|
| `title`    | string     | yes (recommended) | Used as page `<h1>`, `<title>`, and list label. Falls back to the slug if missing. |
| `date`     | string     | yes (recommended) | **Use `YYYY-MM-DD`** (ISO) so chronological sorting works. Sorting is a string compare; non-ISO dates will sort wrong. |
| `excerpt`  | string     | no       | Shown in the list view and used as `<meta name="description">`. Aim for 1–2 sentences. |
| `tags`     | string[]   | no       | Free-form. Not currently used for tag pages — see [Future enhancements](#future-enhancements). |

> Frontmatter is parsed by [`gray-matter`](https://github.com/jonschlinkert/gray-matter), so any valid YAML scalar/list works. Quote strings that contain `:`, `#`, `[`, or other YAML-significant characters.

---

## MDX content

Everything below the closing `---` is the post body. It supports:

### 1. Standard Markdown

```markdown
# H1 (avoid — the page already renders the title)
## H2
### H3

**bold**, *italic*, `inline code`, [link](https://example.com)

- bullet
- list

1. ordered
2. list

> Blockquotes work too.
```

### 2. GitHub-Flavored Markdown (GFM)

Enabled via `remark-gfm`. You get:

- **Tables**
  ```markdown
  | Tool | Version |
  |------|---------|
  | Next | 15      |
  | React| 19      |
  ```
- **Strikethrough** — `~~old plan~~`
- **Task lists** — `- [x] done` / `- [ ] todo`
- **Autolinks** — bare URLs like `https://example.com` become links

### 3. Code blocks

Plain fenced code blocks work. **Syntax highlighting is not enabled yet** (see Future enhancements).

````markdown
```ts
const greet = (name: string) => `Hello, ${name}!`;
```
````

The language tag (`ts`, `tsx`, `js`, `bash`, ...) doesn't currently colorize, but it's already in the markup so when highlighting is added later, your old posts get it for free. **Always include the language tag.**

### 4. JSX inside Markdown (the MDX part)

You can drop React components straight into the post body:

```mdx
import { Sparkles } from "lucide-react";

# My post

This is a normal paragraph.

<aside className="rounded-lg border border-border p-4 my-4">
  <Sparkles size={16} className="inline mr-2" />
  This is a custom callout right inside the post.
</aside>

Back to normal markdown.
```

A few rules:

- **Imports go at the top of the file**, after frontmatter but before the body
- JSX must be on its own block (blank line above and below) for MDX to parse it cleanly
- You can use any project component (e.g. `import { Foo } from "@/components/foo"`)

### 5. Images

For now, use a plain `<img>` tag or markdown syntax. Put images in `public/`:

```markdown
![Alt text](/blog/my-post/diagram.png)
```

`next/image` is not wired into MDX yet — see Future enhancements.

### 6. Links

External links are normal markdown. For internal links to other pages, prefer `next/link` for client-side nav:

```mdx
import Link from "next/link";

Read more on [the projects page](/projects) — works fine, full reload.

Or use <Link href="/projects">the Link component</Link> for SPA nav.
```

---

## What you get for free in rendering

The post body is wrapped in `prose prose-neutral dark:prose-invert max-w-none` (Tailwind Typography plugin), which gives you:

- Sensible heading sizes
- Readable paragraph spacing
- Styled lists, blockquotes, tables, code, links
- Auto dark-mode adjustments
- Sepia mode currently inherits dark prose colors — adjust in `app/globals.css` later if you want a sepia-specific prose variant

The page header (the `h1` title + date) is rendered **outside** the prose container by `app/blog/[slug]/page.tsx`. So you don't need to repeat the title in the body.

---

## How posts are listed and sorted

- **`/blog`** lists every `.mdx` file in `content/blog/`, newest first
- Sort key: `date` field, descending. Sort is a **string compare**, so use `YYYY-MM-DD` consistently
- **Home page** (`/`) shows the 3 most recent posts in the same order
- There's currently no "draft" flag — every file in `content/blog/` is published

---

## Workflow

### New post

```bash
# from project root
touch content/blog/my-new-post.mdx
```

Then paste the template:

```mdx
---
title: ""
date: "YYYY-MM-DD"
excerpt: ""
tags: []
---

```

If `pnpm dev` is already running, the new file shows up after a save (Next 15 fast refresh handles MDX).

### Edit a post

Just edit the file. URL stays the same as long as you don't rename it. If you rename the file, the slug (and URL) changes — set up a redirect in `next.config.ts` if the old URL was shared anywhere.

### Delete a post

`rm content/blog/<slug>.mdx`. The list and the [slug] route both regenerate on the next request (dev) or build (prod).

### Build for production

```bash
pnpm build
```

Each post becomes a statically prerendered page. `pnpm build` will fail loudly if frontmatter is malformed or MDX has a syntax error — use that as your final check before pushing.

---

## Practical guidance

- **Title length** — under ~60 chars. Anything longer truncates in browser tabs and search results.
- **Excerpt length** — 120–160 chars is the sweet spot for `<meta description>`.
- **Date** — set it to the publish date in your local timezone, in `YYYY-MM-DD`. If you're scheduling ahead, post-dated entries currently still show up. (Future-dated drafts aren't filtered out.)
- **Headings** — start the body at `##`. The page already gives you the `<h1>` from `title`. Two `<h1>`s on a page hurts accessibility and SEO.
- **Inline JSX** — use sparingly. The longer your post lives, the more likely an imported component changes shape and breaks the post. Markdown ages better than JSX.
- **Images** — until `next/image` is wired into MDX, optimize manually before committing (resize, compress, prefer SVG/WebP).

---

## Anatomy of a post (full example)

```mdx
---
title: "Why I rebuilt my site in 2026"
date: "2026-04-29"
excerpt: "After two years on a starter template, I tore the whole thing down and rebuilt on Next 15."
tags: ["meta", "next.js"]
---

import { ExternalLink } from "lucide-react";

The old site was a Next.js starter I never cleaned up. By 2026 it had:

- Redux Toolkit driving a counter
- An `axios` client pointed at a mocky.io endpoint
- Three different theming mechanisms layered on top of each other

So I reset.

## What I kept

- The Maitree font
- The screen-size detection plugin (it's actually useful)
- Nothing else

## What I changed

| From | To |
|------|----|
| Next 14 + Pages Router | Next 15 App Router |
| Redux + axios | Server Components reading from `fs` |
| Cookie-driven theme `<Script>` | `next-themes` |
| Tailwind 3 with `tw-` prefix | Tailwind v4, no prefix |

## What's next

- Wire up syntax highlighting
- Add tag pages
- Build out the `/projects` section properly

[Source on GitHub](https://github.com/...) <ExternalLink size={14} className="inline" />
```

---

## Troubleshooting

| Symptom | Likely cause |
|---------|--------------|
| Post 404s at `/blog/<slug>` | Filename slug doesn't match the URL, or file isn't `.mdx`/`.md` |
| List sort is wrong | `date` isn't ISO `YYYY-MM-DD`, so string sort gives unexpected order |
| `Error: Expected a closing tag` | A `<` in the body that MDX read as JSX. Wrap it in backticks: `` `<div>` `` |
| `Cannot find module '...'` after adding `import` | Path is wrong — use `@/components/...`, not relative paths from `content/` |
| Frontmatter "renders" as text in the page | Missing or mismatched `---` fences |
| Post shows up but title is the slug | `title` field missing from frontmatter |
| Build fails with `react/no-unescaped-entities` in MDX | Doesn't apply — that rule only fires in `.tsx`. If you see it, you have JSX in a `.tsx` file, not MDX |

---

## Future enhancements (not yet implemented)

When you (or I) want to add these, here's where they go:

| Feature | Where to wire it in |
|---------|---------------------|
| **Syntax highlighting** | Add `rehype-pretty-code` (or `shiki`) to `mdxOptions.rehypePlugins` in `app/blog/[slug]/page.tsx` |
| **`next/image` in MDX** | Pass a `components` map to `<MDXRemote>` mapping `img` → a wrapper around `next/image` |
| **Drafts** | Add `draft?: boolean` to `PostFrontmatter` in `lib/blog.ts`; filter `getAllPosts()` to drop drafts when `process.env.NODE_ENV === "production"` |
| **Tag pages** | Add `app/blog/tag/[tag]/page.tsx` and a `getPostsByTag(tag)` helper in `lib/blog.ts` |
| **Reading time** | Use `reading-time` package against `post.content`, expose on the `Post` type |
| **RSS feed** | Add `app/feed.xml/route.ts` returning XML built from `getAllPosts()` |
| **Sitemap** | Add `app/sitemap.ts` returning entries for `/`, `/blog`, all post slugs, etc. |
| **Custom MDX components** | Define a `components` map and pass it to `<MDXRemote components={...}>` in `app/blog/[slug]/page.tsx` |

---

## Files involved (for reference)

- `content/blog/*.mdx` — your posts
- `lib/blog.ts` — reads posts, parses frontmatter, sorts
- `app/blog/page.tsx` — list view
- `app/blog/[slug]/page.tsx` — detail view, MDX renderer
- `lib/format.ts` — date formatting helper
- `app/globals.css` — typography styles via `@plugin "@tailwindcss/typography"`
