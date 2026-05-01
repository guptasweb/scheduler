import { useState, useEffect } from "react";
import { formatInputDate } from "../utils/dates";

const EMPTY_FORM = { title: "", post_text: "", scheduled_date: "", status: "scheduled" };

export function PostForm({ post, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing an existing post
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title ?? "",
        post_text: post.post_text ?? "",
        scheduled_date: formatInputDate(post.scheduled_date),
        status: post.status ?? "scheduled",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [post]);

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (form.title.length > 255) errs.title = "Title must be under 255 characters";
    if (!form.post_text.trim()) errs.post_text = "Post content is required";
    if (!form.scheduled_date) errs.scheduled_date = "Scheduled date is required";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    await onSubmit(form);
  }

  const isEditing = !!post;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <div>
        <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Product launch announcement"
          className={`w-full bg-ink-800 border ${
            errors.title ? "border-coral/50" : "border-white/10"
          } rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20
          focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/20 transition-colors`}
        />
        {errors.title && (
          <p className="mt-1.5 text-coral text-xs font-body">{errors.title}</p>
        )}
      </div>

      {/* Post text */}
      <div>
        <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
          Post Content
        </label>
        <textarea
          name="post_text"
          value={form.post_text}
          onChange={handleChange}
          rows={4}
          placeholder="Write your post content here..."
          className={`w-full bg-ink-800 border ${
            errors.post_text ? "border-coral/50" : "border-white/10"
          } rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20
          focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/20 transition-colors resize-none`}
        />
        {errors.post_text && (
          <p className="mt-1.5 text-coral text-xs font-body">{errors.post_text}</p>
        )}
      </div>

      {/* Date and Status row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
            Scheduled Date
          </label>
          <input
            type="datetime-local"
            name="scheduled_date"
            value={form.scheduled_date}
            onChange={handleChange}
            className={`w-full bg-ink-800 border ${
              errors.scheduled_date ? "border-coral/50" : "border-white/10"
            } rounded-xl px-4 py-3 text-white text-sm font-mono
            focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/20 transition-colors
            [color-scheme:dark]`}
          />
          {errors.scheduled_date && (
            <p className="mt-1.5 text-coral text-xs font-body">{errors.scheduled_date}</p>
          )}
        </div>

        {isEditing && (
          <div>
            <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-ink-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono
              focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/20 transition-colors"
            >
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : isEditing ? "Save Changes" : "Schedule Post"}
        </button>
      </div>
    </form>
  );
}
