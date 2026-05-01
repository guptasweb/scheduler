import {
  format,
  formatDistanceToNow,
  isPast,
  isFuture,
  isToday,
  isTomorrow,
  parseISO,
} from "date-fns";

export function parseDate(isoString) {
  if (!isoString) return null;
  return parseISO(isoString);
}

export function formatScheduledDate(isoString) {
  const date = parseDate(isoString);
  if (!date) return "—";
  return format(date, "MMM d, yyyy · h:mm a");
}

export function formatRelativeDate(isoString) {
  const date = parseDate(isoString);
  if (!date) return "—";

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return formatDistanceToNow(date, { addSuffix: true });

  return formatDistanceToNow(date, { addSuffix: true });
}

export function getDateStatus(isoString, status) {
  const date = parseDate(isoString);
  if (!date) return "unknown";

  if (status === "published") return "published";
  if (status === "cancelled") return "cancelled";
  if (isPast(date)) return "overdue";
  if (isToday(date)) return "today";
  return "upcoming";
}

export function formatInputDate(isoString) {
  if (!isoString) return "";
  const date = parseDate(isoString);
  return format(date, "yyyy-MM-dd'T'HH:mm");
}
