import type { DateStatus } from "../types";

const STATUS_STYLES: Partial<Record<DateStatus, string>> = {
  scheduled: "bg-sky/10 text-sky border border-sky/20",
  published: "bg-signal/10 text-signal border border-signal/20",
  cancelled: "bg-white/5 text-white/40 border border-white/10",
  overdue: "bg-coral/10 text-coral border border-coral/20",
  today: "bg-signal/20 text-signal border border-signal/30 animate-pulse",
  upcoming: "bg-sky/10 text-sky border border-sky/20",
  unknown: "bg-white/5 text-white/40 border border-white/10",
};

const STATUS_DOTS: Partial<Record<DateStatus, string>> = {
  scheduled: "bg-sky",
  published: "bg-signal",
  cancelled: "bg-white/30",
  overdue: "bg-coral",
  today: "bg-signal",
  upcoming: "bg-sky",
  unknown: "bg-white/30",
};

type StatusBadgeProps = {
  status: DateStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.scheduled;
  const dot = STATUS_DOTS[status] ?? STATUS_DOTS.scheduled;

  return (
    <span className={`status-badge ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
