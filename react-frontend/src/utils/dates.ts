import {
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
  parseISO,
} from "date-fns";
import type { DateStatus, PostStatus } from "../types";

export function parseDate(isoString: string | null | undefined): Date | null {
  if (!isoString) return null;
  return parseISO(isoString);
}

export function formatScheduledDate(isoString: string | null | undefined): string {
  const date = parseDate(isoString);
  if (!date) return "—";
  return format(date, "MMM d, yyyy · h:mm a");
}

export function formatRelativeDate(isoString: string | null | undefined): string {
  const date = parseDate(isoString);
  if (!date) return "—";

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return formatDistanceToNow(date, { addSuffix: true });

  return formatDistanceToNow(date, { addSuffix: true });
}

export function getDateStatus(
  isoString: string | null | undefined,
  status: PostStatus
): DateStatus {
  const date = parseDate(isoString);
  if (!date) return "unknown";

  if (status === "published") return "published";
  if (status === "cancelled") return "cancelled";
  if (isPast(date)) return "overdue";
  if (isToday(date)) return "today";
  return "upcoming";
}

export function formatInputDate(isoString: string | null | undefined): string {
  if (!isoString) return "";
  const date = parseDate(isoString);
  if (!date) return "";
  return format(date, "yyyy-MM-dd'T'HH:mm");
}
