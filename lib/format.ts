import dayjs from "dayjs";

export function formatDate(date: string | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMM D, YYYY");
}

// Compact ISO-ish for editorial mono captions: "2026·04·18".
export function formatDateMono(date: string | undefined): string {
  if (!date) return "";
  return dayjs(date).format("YYYY·MM·DD");
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min · ${minutes} นาที`;
}
