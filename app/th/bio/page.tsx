// /th/bio — same unstyled bio as /bio, but with a small "English only" notice
// at the top because the body copy stays English regardless of chrome lang.

import type { Metadata } from "next";

import { BioContent } from "@/components/bio-content";

export const metadata: Metadata = {
  title: "Tony — Bio",
  description: "Ariyapong Wimolnoch (Tony) — Senior Software Developer, Bangkok.",
  alternates: { canonical: "/bio" },
};

export default function UnstyledBioPageTh() {
  return <BioContent lang="th" />;
}
