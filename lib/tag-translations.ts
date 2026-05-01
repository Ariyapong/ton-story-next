// Thai translations for tag labels — keep in sync with content frontmatter.
export const TAG_TH: Record<string, string> = {
  "next.js": "next.js",
  typescript: "ไทป์สคริปต์",
  design: "ดีไซน์",
  work: "งาน",
  essay: "บทความ",
  health: "สุขภาพ",
  mdx: "mdx",
  programming: "การเขียนโปรแกรม",
  i18n: "หลายภาษา",
  typography: "ตัวอักษร",
  meta: "เกี่ยวกับเว็บนี้",
  varieties: "หลากหลาย",
  life: "ชีวิต",
  react: "react",
  tooling: "เครื่องมือ",
};

export function tagTh(tag: string): string {
  return TAG_TH[tag] ?? tag;
}
