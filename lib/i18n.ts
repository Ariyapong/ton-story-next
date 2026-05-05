export const LANGS = ["en", "th"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

// Bare paths are the canonical English URLs. /th/... is the Thai canonical.
// /en/... also resolves but its canonical points at the bare path (handled
// in generateMetadata via canonicalFor).
export function localizeHref(href: string, lang: Lang): string {
  if (lang === "en") return href;
  if (href === "/") return "/th";
  if (href.startsWith("/th")) return href;
  return `/th${href}`;
}

export function canonicalFor(path: string, lang: Lang): string {
  if (lang === "en") return path;
  if (path === "/") return "/th";
  return `/th${path}`;
}

export function hreflangAlternates(
  path: string,
): Record<string, string> {
  const enUrl = path;
  const thUrl = path === "/" ? "/th" : `/th${path}`;
  return {
    en: enUrl,
    th: thUrl,
    "x-default": enUrl,
  };
}

export function ogLocale(lang: Lang): string {
  return lang === "th" ? "th_TH" : "en_US";
}

// Strip any /en or /th prefix from a pathname so it can be re-localized.
// Used by the language switcher to compute the URL for the other language.
export function stripLangPrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/th") return "/";
  if (pathname.startsWith("/en/") || pathname.startsWith("/th/")) {
    return pathname.slice(3);
  }
  return pathname;
}

export function swapToLang(pathname: string, target: Lang): string {
  return localizeHref(stripLangPrefix(pathname), target);
}

// Chrome strings — labels, eyebrows, sidebars, counters, empty states.
// Body content stays in MDX/per-page; this dict is for shared chrome only.
// Brand mark (Aritoton · อริโตต้น) is rendered directly in the header,
// not from this dict, because it intentionally stays bilingual side-by-side.
type Dict = {
  nav: {
    home: string;
    blog: string;
    projects: string;
    tags: string;
    openMenu: string;
    allPosts: string;
    allPostsLong: string;
    allProjects: string;
    allTags: string;
    all: string;
  };
  footer: {
    findMe: string;
    pages: string;
    blog: string;
    projects: string;
    tags: string;
    about: string;
    tip: string;
  };
  eyebrow: {
    catalogue: string;
    archive: string;
    tagIndex: string;
    filed: string;
    published: string;
    reading: string;
    related: string;
    year: string;
    stack: string;
    filtered: string;
    fromDesk: string;
    footnote: string;
    vol: string;
    recent: string;
    featured: string;
    role: string;
    based: string;
    findMe: string;
  };
  page: {
    blogTitle: string;
    blogDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    projectsTagline: string;
    tagsTitle: string;
    tagsDesc: string;
    homeDesc: string;
  };
  counter: {
    entries: (n: number) => string;
    entriesSorted: (n: number) => string;
    entriesPlural: (n: number) => string;
  };
  card: {
    featured: string;
    older: string;
    newer: string;
  };
  project: {
    live: string;
    source: string;
    copyLink: string;
    copied: string;
    thaiComing: string;
  };
  empty: {
    posts: string;
    projects: string;
    tags: string;
    relatedPosts: string;
  };
  a11y: {
    language: string;
    openNav: string;
  };
  home: {
    greeting: string;
    tagline: string;
    bioParagraph: string;
    role: string;
    based: string;
    stack: string;
    quote: string;
    houseRule: string;
    footnoteIntro: string;
    footnoteDrink: string;
  };
};

const en: Dict = {
  nav: {
    home: "Home",
    blog: "Blog",
    projects: "Projects",
    tags: "Tags",
    openMenu: "Open navigation",
    allPosts: "← All posts",
    allPostsLong: "← All posts",
    allProjects: "← All projects",
    allTags: "← All tags",
    all: "All →",
  },
  footer: {
    findMe: "Find me",
    pages: "Pages",
    blog: "Blog",
    projects: "Projects",
    tags: "Tags",
    about: "About",
    tip: "tip: press j/k to navigate posts",
  },
  eyebrow: {
    catalogue: "The catalogue",
    archive: "The archive",
    tagIndex: "The index",
    filed: "Filed",
    published: "Published",
    reading: "Reading",
    related: "Related",
    year: "Year",
    stack: "Stack",
    filtered: "Filtered",
    fromDesk: "From the desk",
    footnote: "Footnote",
    vol: "Vol. 01 · Bangkok · 2026",
    recent: "Recent dispatches",
    featured: "Featured work",
    role: "Role",
    based: "Based",
    findMe: "Find me",
  },
  page: {
    blogTitle: "Blog",
    blogDesc: "Notes and writing.",
    projectsTitle: "Projects",
    projectsDesc:
      "Things I've built — production work, side quests, experiments.",
    projectsTagline: "Public side quests — the rest stay private.",
    tagsTitle: "Tags",
    tagsDesc: "Browse posts by topic.",
    homeDesc:
      "Ariyapong Wongmaneerat (Tony) — senior software developer in Bangkok.",
  },
  counter: {
    entries: (n) => `${n} entries`,
    entriesSorted: (n) => `${n} entries · sorted ↓`,
    entriesPlural: (n) => `${n} entr${n === 1 ? "y" : "ies"}`,
  },
  card: {
    featured: "★ featured",
    older: "← Older",
    newer: "Newer →",
  },
  project: {
    live: "Live ↗",
    source: "Source ↗",
    copyLink: "↗ copy link",
    copied: "✓ copied",
    thaiComing: "Thai translation coming soon",
  },
  empty: {
    posts: "No posts yet.",
    projects: "No projects yet.",
    tags: "No tags yet. Add `tags: [...]` frontmatter to a post to see it here.",
    relatedPosts: "No related posts yet.",
  },
  a11y: {
    language: "Language",
    openNav: "Open navigation",
  },
  home: {
    greeting: "Hi, I’m Ton.",
    tagline: "Senior software developer in Bangkok",
    bioParagraph:
      "Senior software developer in Bangkok. I build for the web — frontend mostly, but I’ll wander wherever the work goes. This page is the index; the writing is where I really live.",
    role: "Senior Software Developer",
    based: "Bangkok, Thailand",
    stack: "Javascript, TypeScript, React.js, React Frameworks, Tailwind, MDX",
    quote: "When we lose our principle, we invite chaos.",
    houseRule: "— house rule",
    footnoteIntro:
      "Type ttt anywhere on this page, then look at the quote. Small joke for anyone paying attention.",
    footnoteDrink:
      "Or type a drink — coffee, tea, milk — and the page shifts its mood.",
  },
};

const th: Dict = {
  nav: {
    home: "หน้าแรก",
    blog: "บล็อก",
    projects: "ผลงาน",
    tags: "แท็ก",
    openMenu: "เปิดเมนู",
    allPosts: "← บทความทั้งหมด",
    allPostsLong: "← บทความทั้งหมด",
    allProjects: "← ผลงานทั้งหมด",
    allTags: "← แท็กทั้งหมด",
    all: "ทั้งหมด →",
  },
  footer: {
    findMe: "ติดต่อ",
    pages: "หน้า",
    blog: "บล็อก",
    projects: "ผลงาน",
    tags: "แท็ก",
    about: "เกี่ยวกับ",
    tip: "เคล็ดลับ: กด j/k เพื่อเลื่อนบทความ",
  },
  eyebrow: {
    catalogue: "สารบัญงาน",
    archive: "คลังบทความ",
    tagIndex: "ดัชนี",
    filed: "หมวด",
    published: "เผยแพร่",
    reading: "เวลาอ่าน",
    related: "ที่เกี่ยวข้อง",
    year: "ปี",
    stack: "เครื่องมือ",
    filtered: "กรอง",
    fromDesk: "จากโต๊ะทำงาน",
    footnote: "เชิงอรรถ",
    vol: "Vol. 01 · กรุงเทพฯ · 2026",
    recent: "บันทึกล่าสุด",
    featured: "ผลงานเด่น",
    role: "ตำแหน่ง",
    based: "อยู่ที่",
    findMe: "ติดต่อ",
  },
  page: {
    blogTitle: "บล็อก",
    blogDesc: "บันทึกและงานเขียน",
    projectsTitle: "ผลงาน",
    projectsDesc: "งานที่ทำมา — งานประจำ งานเสริม การทดลอง",
    projectsTagline: "เผยแพร่เฉพาะบางส่วน — ที่เหลือเก็บไว้ส่วนตัว",
    tagsTitle: "แท็ก",
    tagsDesc: "เลือกอ่านตามหัวข้อ",
    homeDesc:
      "อริยะพงษ์ วิมลนุช (ต้น) — นักพัฒนาซอฟต์แวร์อาวุโส อยู่ที่กรุงเทพฯ",
  },
  counter: {
    entries: (n) => `${n} รายการ`,
    entriesSorted: (n) => `${n} รายการ · เรียงใหม่ → เก่า`,
    entriesPlural: (n) => `${n} รายการ`,
  },
  card: {
    featured: "★ งานเด่น",
    older: "← เก่ากว่า",
    newer: "ใหม่กว่า →",
  },
  project: {
    live: "ดูของจริง ↗",
    source: "ซอร์ส ↗",
    copyLink: "↗ คัดลอกลิงก์",
    copied: "✓ คัดลอกแล้ว",
    thaiComing: "ฉบับไทยเร็ว ๆ นี้",
  },
  empty: {
    posts: "ยังไม่มีบทความ",
    projects: "ยังไม่มีผลงาน",
    tags: "ยังไม่มีแท็ก เพิ่ม `tags: [...]` ใน frontmatter ของบทความเพื่อให้ปรากฏที่นี่",
    relatedPosts: "ยังไม่มีบทความที่เกี่ยวข้อง",
  },
  a11y: {
    language: "ภาษา",
    openNav: "เปิดเมนู",
  },
  home: {
    greeting: "สวัสดี ผมต้น",
    tagline: "นักพัฒนาซอฟต์แวร์อาวุโส อยู่ที่กรุงเทพฯ",
    bioParagraph:
      "ผมเขียนโค้ดสำหรับเว็บ — ส่วนใหญ่เป็นฝั่ง frontend แต่ก็ตามงานไปได้ทุกที่ที่จำเป็น หน้านี้เป็นเพียงสารบัญ Blog คือที่ที่ผมอยู่จริง ๆ ส่วนใหญ่เกี่ยวกับ Javascript, TypeScript, React.js, React Frameworks และเรื่องเล็ก ๆ น้อย ๆ ที่ผมเรียนรู้",
    role: "นักพัฒนาซอฟต์แวร์อาวุโส",
    based: "กรุงเทพฯ ประเทศไทย",
    stack: "Javascript, TypeScript, React.js, React Frameworks, Tailwind, MDX",
    quote: "เมื่อใดที่เราละทิ้งหลักการ เมื่อนั้นเราเชิญความวุ่นวายเข้ามา",
    houseRule: "— กฎประจำบ้าน",
    footnoteIntro:
      "ลองพิมพ์ ttt ที่ไหนก็ได้บนหน้านี้ แล้วดูที่คำพูด — เรื่องเล็ก ๆ สำหรับคนที่สังเกต",
    footnoteDrink:
      "หรือพิมพ์ชื่อเครื่องดื่ม — coffee, tea, milk — แล้วดูหน้าเปลี่ยนอารมณ์ตาม",
  },
};

const DICT: Record<Lang, Dict> = { en, th };

export function getDict(lang: Lang): Dict {
  return DICT[lang];
}
