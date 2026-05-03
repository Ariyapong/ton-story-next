# MDX guide

A comprehensive reference for the MDX format as used in this project. If you want the **workflow** (where to put files, how to publish, frontmatter fields), see [writing-blog-posts.md](./writing-blog-posts.md). This doc is about **the format itself** — what MDX can do, how to think about it, and the gotchas worth knowing up front.

---

## What MDX actually is

MDX = **Markdown + JSX in the same file**.

Plain Markdown gets compiled to HTML. MDX takes the same idea but compiles to a **React component**. That means:

- Everything you can do in Markdown still works.
- Anywhere in the file, you can drop in a React component and it renders inline.
- The file is parsed by an MDX compiler — *not* by a regular Markdown parser — which has subtle implications (covered in [Gotchas](#gotchas)).

> Mental model: an MDX file is a React component whose body happens to be 95% Markdown.

In this project, MDX files in `content/blog/*.mdx` are read at request time by [`lib/blog.ts`](../lib/blog.ts) and rendered by `<MDXRemote>` from `next-mdx-remote/rsc` inside [`app/(styled)/blog/[slug]/page.tsx`](<../app/(styled)/blog/[slug]/page.tsx>). Server-side. No JS shipped to the client for the post body itself.

---

## The mental model: when to reach for what

Three layers, in order of preference:

1. **Plain Markdown** — paragraphs, headings, lists, links, code fences. Use this 95% of the time. Ages well, easy to skim, easy to grep.
2. **GFM extensions** — tables, task lists, strikethrough, autolinks. Use whenever they fit naturally.
3. **JSX components** — only when Markdown genuinely can't express the idea (interactive demo, custom callout, embedded chart). Every JSX component you embed is a future maintenance liability — if the component's props change, the post breaks.

If you find yourself reaching for JSX often, that's usually a sign you need a **new shared component** (built once, reused everywhere) rather than ad-hoc JSX in each post.

---

## Anatomy of an MDX file

```mdx
---
title: "..."
date: "YYYY-MM-DD"
---

import { Callout } from "@/components/callout";

# Body starts here

Normal paragraphs.

<Callout>JSX block, must have blank lines around it.</Callout>

More markdown.
```

Three regions:

| Region | What goes there |
|--------|-----------------|
| **Frontmatter** (`---` fenced YAML at top) | Metadata. Parsed by `gray-matter`, never rendered. See [writing-blog-posts.md](./writing-blog-posts.md#frontmatter-reference) for the schema this project expects. |
| **Imports** (after frontmatter, before body) | ES module imports for any component used below. **Imports must be at the top of the file**, not inline. |
| **Body** | Markdown + inline JSX. |

---

## Capabilities in this project

Listed roughly in order of how often you'll use them.

### 1. Standard Markdown

Everything you'd expect:

```markdown
## Heading 2
### Heading 3

A paragraph with **bold**, *italic*, `inline code`, and a [link](https://example.com).

- bullet
- list

1. ordered
2. list

> Blockquote.

---  ← horizontal rule (3+ dashes on their own line)
```

**Note on `H1`:** the page renders the post's `title` field as the page `<h1>` already. Start your body at `##`. Two `<h1>`s on a page is bad for accessibility and SEO.

### 2. Code blocks

Triple-backtick fenced blocks. **Always include the language tag**, even though syntax highlighting isn't wired up yet — when it gets added later, every old post lights up automatically.

````markdown
```ts
const greet = (name: string) => `Hello, ${name}!`;
```

```bash
pnpm dev
```
````

For inline code, use single backticks: `` `useState()` ``.

To show **a code fence inside a code fence** (rare but useful for docs like this one), wrap with **four** backticks on the outside.

### 3. GitHub-Flavored Markdown (GFM)

Enabled via the `remark-gfm` plugin in [`app/(styled)/blog/[slug]/page.tsx`](<../app/(styled)/blog/[slug]/page.tsx>). You get:

**Tables** — pipes and dashes. Header row required.

```markdown
| Tool   | Version |
|--------|---------|
| Next   | 15      |
| React  | 19      |
```

**Task lists**

```markdown
- [x] done
- [ ] todo
```

**Strikethrough** — `~~old plan~~` → ~~old plan~~.

**Autolinks** — bare URLs like `https://example.com` become clickable links automatically. You don't need `<https://...>` syntax.

### 4. JSX in the body (the M*X* part)

Any imported React component can be dropped into the body:

```mdx
import { Callout } from "@/components/callout";

Some markdown text.

<Callout tone="warning">
  This renders as a real React component.
</Callout>

More markdown.
```

A few hard rules:

- **Imports must be at the top** of the file, after frontmatter.
- **Block-level JSX needs blank lines above and below.** Without them, MDX may treat the surrounding text as part of the JSX or fail to parse.
- **Use the `@/` import alias** (e.g. `@/components/foo`), never relative paths from `content/`.
- **JSX must be valid React**: self-close void tags (`<br />`, not `<br>`), use `className` not `class`, use camelCase attributes (`tabIndex`, not `tabindex`).

You can also use **inline JSX** — JSX elements inside a paragraph — but it's fragile; prefer block JSX or a custom component.

### 5. Interpolating JS expressions

You can embed JS expressions in `{ }`:

```mdx
export const author = "Tony";

Hello, {author}. The year is {new Date().getFullYear()}.
```

This is useful but rarely needed. Most of the time you should hardcode the value or pass a prop into a component.

### 6. Importing other MDX

You can `import` another MDX file as a component:

```mdx
import Disclaimer from "./_disclaimer.mdx";

<Disclaimer />
```

In this project the post directory is flat and we don't currently use partials, but it's available if you ever want to share boilerplate (e.g. a series intro across multiple posts).

### 7. HTML

Raw HTML works in MDX, but **MDX parses `<` as the start of JSX**. So:

- `<div className="...">` — works (treated as JSX, which is HTML-like).
- `<div class="...">` — **fails** in JSX mode (must use `className`).
- `<!-- HTML comment -->` — **does not work**. Use `{/* JSX comment */}` instead.

In practice: avoid raw HTML in MDX. Use Markdown for content and JSX for components.

### 8. Images

For now, plain Markdown images or `<img>`:

```markdown
![Alt text](/blog/my-post/diagram.png)
```

Images go in `public/`. `next/image` is **not currently wired into MDX**. When you want it, the change is a `components` map in [`app/(styled)/blog/[slug]/page.tsx`](<../app/(styled)/blog/[slug]/page.tsx>) — see [Future enhancements](./writing-blog-posts.md#future-enhancements).

### 9. Bilingual content

This project mixes English and Thai freely in the same file. MDX doesn't care — the content is just text. The reading-time helper in [`lib/blog.ts`](../lib/blog.ts) counts Thai characters separately and converts them to word-equivalents at 6 chars/word. Authoring tip: keep one language per paragraph for cleaner reading rhythm; switch at paragraph or section boundaries, not mid-sentence.

---

## Gotchas

The real "what should I know" section. Most MDX confusion traces back to one of these.

### G1. Blank lines around block JSX

**Bad** — MDX parser confused:

```mdx
Here is some text.
<Callout>Hello</Callout>
And here is more.
```

**Good**:

```mdx
Here is some text.

<Callout>Hello</Callout>

And here is more.
```

### G2. `<` and `>` in prose

A bare `<` makes MDX think a JSX tag is starting. If you write:

```mdx
Use `if (x < 5)` to check.
```

You're fine — it's inside backticks. But:

```mdx
Use if (x < 5) to check.
```

…breaks the parse. Either backtick the snippet or escape: `&lt;`.

### G3. Comments

- `<!-- HTML comments -->` — **don't work**.
- `{/* JSX comments */}` — **work**, but only between JSX elements or expressions, not inside Markdown prose.
- For "notes to self" you don't want rendered, use frontmatter-style draft headings or just delete them. There's no first-class draft syntax in MDX.

### G4. Curly braces in prose

A literal `{` is treated as the start of a JS expression:

```mdx
This costs ${price} dollars.   ← MDX tries to evaluate `price`, errors out
```

Fix:

```mdx
This costs `${price}` dollars.       ← inside code: literal
This costs \${price} dollars.        ← escaped: literal
```

### G5. Indentation breaks code fences

Inside a list, a code fence needs to be **flush with the list-item content**, not over-indented:

````mdx
- A list item with code:

  ```ts
  const x = 1;
  ```

- Another item.
````

If you indent the fence further, MDX may treat the content as a paragraph instead.

### G6. Relative imports from `content/`

```mdx
import { Foo } from "../../components/foo";   ← brittle
import { Foo } from "@/components/foo";       ← use this
```

The `@/` alias is configured to resolve from project root. Stick to it.

### G7. Frontmatter strings with colons

YAML treats `:` as key/value separator. If your title has a colon, **quote the whole string**:

```yaml
title: "MDX: a comprehensive guide"   ← good
title: MDX: a comprehensive guide     ← YAML parse error
```

Same goes for `#`, `[`, `]`, `&`, `*`, `?`, `|`, `>`. When in doubt, quote it.

### G8. `export` from MDX

You can `export const x = ...` from MDX, and `import` declarations also work, but **default exports** (`export default ...`) override the page-rendering behavior — don't write one unless you know why you need it.

### G9. The `import` path is the source file's perspective

Imports in MDX resolve relative to the MDX file's own directory (or via the `@/` alias). It's not relative to the rendering page (`app/(styled)/blog/[slug]/page.tsx`). This trips people up because the MDX is "rendered" from the page but "lives" in `content/`.

---

## Tips & tricks

### T1. Lists of "before / after" comparisons

GFM tables shine here:

```markdown
| Before | After |
|--------|-------|
| Redux  | RSC + `fs` |
| Tailwind 3 | Tailwind 4 |
```

### T2. Asides without a custom component

A blockquote with a leading bold word reads like a callout for free:

```markdown
> **Note** — this is a side comment without needing a `<Callout>` component.
```

When you want stronger styling, *then* reach for a JSX component.

### T3. Highlighting a single line

Use a code fence with one line, even for a one-liner. It pulls the eye and makes it copy-able:

````markdown
```bash
pnpm dlx shadcn@latest add button
```
````

### T4. Footnotes (GFM)

`remark-gfm` supports footnotes:

```markdown
Here is a claim.[^1]

[^1]: And here's the source.
```

The footnote renders at the bottom of the post with a back-link.

### T5. Soft vs hard line breaks

In Markdown, a single newline is **not** a line break — it joins the line. To force a `<br>`, end the line with **two trailing spaces** or use `\` at end of line. Most of the time you want a blank line and a new paragraph instead.

### T6. Keep imports minimal

Every `import` at the top adds compile cost and a coupling point. If a component is used in only one post, that's fine — but if it's used in three posts, consider adding it to the global `components` map (see [Future enhancements](./writing-blog-posts.md#future-enhancements)) so individual posts don't have to import it.

### T7. Wrap long URLs in autolink-friendly form

A bare URL on its own line autolinks. A URL inside a parenthetical `(like this)` may not. If the autolink doesn't fire, make it explicit: `[label](url)`.

### T8. Use `prose-editorial` to your advantage

The post body is wrapped in a `prose-editorial` container. That means:

- You don't need to style headings, lists, or links — they're already styled.
- If you write a JSX component for the post, **don't restyle prose** inside it. Let it inherit. Restyle only when stepping out of the prose flow (full-bleed images, custom layouts).

### T9. Preview locally with hot reload

`pnpm dev` reloads the post on save. The build (`pnpm build`) is your "lint" — it fails loudly on malformed frontmatter or MDX syntax errors. Run it before pushing if you've done anything unusual.

### T10. Long posts: outline first in plain Markdown

Get the headings and bullet structure right in plain Markdown. Sprinkle JSX in last, only where it earns its keep. Posts that start as "let me try this fancy component" tend to bury the writing.

---

## What's wired up vs what's not

Snapshot of *this* project's MDX pipeline (as of 2026-05).

| Feature | Status | Where |
|---------|--------|-------|
| Markdown + GFM | ✅ enabled | `remarkPlugins: [remarkGfm]` |
| JSX components inline | ✅ via per-file `import` | Author imports inside the MDX file |
| Frontmatter | ✅ via `gray-matter` | [`lib/blog.ts`](../lib/blog.ts) |
| Bilingual fields (`titleTh`, `excerptTh`) | ✅ | [`lib/blog.ts:7-14`](../lib/blog.ts#L7-L14) |
| Reading time (Latin + Thai) | ✅ | [`lib/blog.ts:24-30`](../lib/blog.ts#L24-L30) |
| Syntax highlighting | ❌ not yet | Add `rehype-pretty-code` to `mdxOptions.rehypePlugins` |
| Global `components` map for `<MDXRemote>` | ❌ not yet | Each post imports its own |
| `next/image` in MDX | ❌ not yet | Map `img` in the components map |
| Drafts | ❌ not yet | Add `draft?: boolean` to `PostFrontmatter`, filter in `getAllPosts()` |
| MDX partials (`import X from "./_partial.mdx"`) | ✅ supported | Not used yet, but works out of the box |

---

## Cheat sheet

```mdx
---
title: "Required, quoted if it has any of: colon hash bracket"
titleTh: "Optional Thai title"
date: "2026-05-02"
excerpt: "1–2 sentence summary."
tags: ["next.js", "mdx"]
---

import { SomeComponent } from "@/components/some-component";

## First section (start at H2, never H1)

A normal paragraph with **bold** and `inline code`.

- a list
- with **GFM** support

| col | col |
|-----|-----|
| a   | b   |

```ts
// Always tag your fences with a language.
const x = 1;
```

> **Note** — blockquotes work, and a leading bold word makes a free callout.

<SomeComponent prop="value">
  Need blank lines above and below this block.
</SomeComponent>

{/* JSX comment — for notes to self that won't render */}
```

---

## Further reading

- [MDX official docs](https://mdxjs.com/) — the spec and full feature list.
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) — the renderer this project uses.
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GFM features.
- [`writing-blog-posts.md`](./writing-blog-posts.md) — the workflow side: where files go, how publishing works.
