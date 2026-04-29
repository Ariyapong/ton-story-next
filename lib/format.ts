import dayjs from "dayjs";

export function formatDate(date: string | undefined): string {
  if (!date) return "";
  return dayjs(date).format("MMM D, YYYY");
}
