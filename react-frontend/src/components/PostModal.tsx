import { useEffect } from "react";
import type { Post } from "../types";
import { StatusBadge } from "./StatusBadge";
import { formatScheduledDate, getDateStatus } from "../utils/dates";

type PostModalProps = {
  post: Post;
  onClose: () => void;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
};

export function PostModal({ post, onClose, onEdit, onDelete }: PostModalProps) {
  const dateStatus = getDateStatus(post.scheduled_date, post.status);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />

      <div className="relative card w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-white/8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={dateStatus} />
            </div>
            <h2 className="font-display font-bold text-xl text-white leading-tight">
              {post.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors flex-shrink-0 mt-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Post Content</p>
            <p className="text-white/80 text-sm leading-relaxed font-body whitespace-pre-wrap">
              {post.post_text}
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-ink-800 rounded-xl">
            <div className="w-8 h-8 bg-signal/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-wider">Scheduled For</p>
              <p className="text-white text-sm font-mono">{formatScheduledDate(post.scheduled_date)}</p>
            </div>
          </div>

          {(post.photos?.length ?? 0) > 0 && post.photos && (
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3">
                Attached Photos ({post.photos.length})
              </p>
              <div className="grid grid-cols-2 gap-3">
                {post.photos.map((photo) => (
                  <div key={photo.id} className="group rounded-xl overflow-hidden bg-ink-800 border border-white/5">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.caption || "Post photo"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.src =
                            "https://via.placeholder.com/400x300/1c1c28/ffffff?text=Photo";
                        }}
                      />
                    </div>
                    {photo.caption && (
                      <p className="text-white/40 text-xs p-2 font-body leading-snug">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-white/8">
          <button
            type="button"
            onClick={() => onDelete(post.id)}
            className="text-coral/60 hover:text-coral text-sm font-body flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-ghost text-xs">
              Close
            </button>
            <button type="button" onClick={() => onEdit(post)} className="btn-primary text-xs">
              Edit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
