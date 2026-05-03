import type { PostStatus, PostsFilter, ScopeFilter } from "../types";

const SCOPE_OPTIONS: { value: ScopeFilter; label: string }[] = [
  { value: "", label: "All Posts" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

const STATUS_OPTIONS: { value: "" | PostStatus; label: string }[] = [
  { value: "", label: "Any Status" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
];

type FilterBarProps = {
  filter: PostsFilter;
  onChange: (f: PostsFilter) => void;
  total: number;
};

export function FilterBar({ filter, onChange, total }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex rounded-xl border border-white/8 overflow-hidden">
        {SCOPE_OPTIONS.map((opt) => (
          <button
            key={opt.value || "all"}
            type="button"
            onClick={() => onChange({ ...filter, scope: opt.value })}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              (filter.scope ?? "") === opt.value
                ? "bg-signal text-ink-950 font-semibold"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select
        value={filter.status ?? ""}
        onChange={(e) =>
          onChange({
            ...filter,
            status: (e.target.value || undefined) as PostStatus | undefined,
          })
        }
        className="bg-ink-800 border border-white/8 rounded-xl px-3 py-1.5 text-xs font-mono text-white/60
        focus:outline-none focus:border-signal/40 transition-colors"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value || "any"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <span className="ml-auto text-xs font-mono text-white/25">
        {total} {total === 1 ? "post" : "posts"}
      </span>
    </div>
  );
}
