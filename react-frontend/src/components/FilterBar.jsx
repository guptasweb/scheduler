const SCOPE_OPTIONS = [
  { value: "", label: "All Posts" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

const STATUS_OPTIONS = [
  { value: "", label: "Any Status" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
];

export function FilterBar({ filter, onChange, total }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Scope filter */}
      <div className="flex rounded-xl border border-white/8 overflow-hidden">
        {SCOPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
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

      {/* Status filter */}
      <select
        value={filter.status ?? ""}
        onChange={(e) => onChange({ ...filter, status: e.target.value || undefined })}
        className="bg-ink-800 border border-white/8 rounded-xl px-3 py-1.5 text-xs font-mono text-white/60
        focus:outline-none focus:border-signal/40 transition-colors"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Count badge */}
      <span className="ml-auto text-xs font-mono text-white/25">
        {total} {total === 1 ? "post" : "posts"}
      </span>
    </div>
  );
}
