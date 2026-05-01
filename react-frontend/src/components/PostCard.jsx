import { StatusBadge } from "./StatusBadge";
import { formatScheduledDate, formatRelativeDate, getDateStatus } from "../utils/dates";

export function PostCard({ post, onClick, style }) {
  const dateStatus = getDateStatus(post.scheduled_date, post.status);
  const hasPhotos = post.photos?.length > 0;

  return (
    <article
      className="card p-5 cursor-pointer hover:border-white/20 hover:bg-ink-800 transition-all duration-200 group animate-fade-up"
      style={style}
      onClick={() => onClick(post)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-display font-semibold text-base text-white group-hover:text-signal transition-colors line-clamp-1">
          {post.title}
        </h2>
        <StatusBadge status={dateStatus} />
      </div>

      {/* Body text */}
      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4 font-body">
        {post.post_text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex flex-col gap-0.5">
          <span className="text-white/30 text-xs font-mono">SCHEDULED</span>
          <span className="text-white/70 text-xs font-mono">
            {formatScheduledDate(post.scheduled_date)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasPhotos && (
            <span className="flex items-center gap-1 text-white/30 text-xs font-mono">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.photos.length}
            </span>
          )}
          <span className="text-white/25 text-xs font-mono">
            {formatRelativeDate(post.scheduled_date)}
          </span>
        </div>
      </div>
    </article>
  );
}
