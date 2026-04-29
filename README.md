# Ton Story

Personal portfolio + blog.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript 5
- Tailwind v4 (CSS-first config in `app/globals.css`)
- `next-themes` for light / dark / sepia
- MDX content (`gray-matter` + `next-mdx-remote/rsc`, `remark-gfm`)

## Run

```bash
pnpm install
pnpm dev          # http://localhost:5174
pnpm build
pnpm type-check
pnpm lint
```

## Structure

```
app/                Routes (App Router)
content/blog/       Blog posts as .mdx (frontmatter: title, date, excerpt, tags)
content/projects/   Project entries as .mdx (frontmatter: title, summary, stack, link, repo, featured)
components/         UI components (header, theme-toggle)
lib/                Content readers + utils (cn, formatDate)
plugins/screen.ts   Screen-size indicator + resize listener
providers/          ThemeProvider, ScreenProvider
```

## Adding content

Drop a new `.mdx` file in `content/blog/` or `content/projects/` with
frontmatter at the top. The list and detail routes pick it up automatically.

For the full guide on writing posts (frontmatter fields, MDX features,
workflow, troubleshooting), see [`docs/writing-blog-posts.md`](docs/writing-blog-posts.md).
```
