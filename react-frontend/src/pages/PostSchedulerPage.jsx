import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";
import { PostModal } from "../components/PostModal";
import { PostForm } from "../components/PostForm";
import { FilterBar } from "../components/FilterBar";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ErrorBanner } from "../components/ErrorBanner";

const PANEL = { NONE: "none", CREATE: "create", EDIT: "edit" };

export default function PostSchedulerPage() {
  const {
    posts, loading, error,
    filter, setFilter,
    fetchPosts, createPost, updatePost, deletePost,
  } = usePosts();

  const [selectedPost, setSelectedPost] = useState(null);
  const [panel, setPanel] = useState(PANEL.NONE);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleCardClick(post) {
    setSelectedPost(post);
  }

  function handleCloseModal() {
    setSelectedPost(null);
  }

  function handleEditFromModal(post) {
    setSelectedPost(post);
    setPanel(PANEL.EDIT);
  }

  async function handleCreate(formData) {
    setFormLoading(true);
    try {
      await createPost(formData);
      setPanel(PANEL.NONE);
      showToast("Post scheduled successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleUpdate(formData) {
    setFormLoading(true);
    try {
      await updatePost(selectedPost?.id, formData);
      setPanel(PANEL.NONE);
      setSelectedPost(null);
      showToast("Post updated!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePost(id);
      setSelectedPost(null);
      showToast("Post deleted.");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 0%, rgba(232,255,71,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 100%, rgba(71,208,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 py-10">
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-signal rounded-full" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                  Scheduler
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl text-white tracking-tight">
                Social Posts
              </h1>
            </div>
            <button
              onClick={() => setPanel(PANEL.CREATE)}
              className="btn-primary mt-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </button>
          </div>
        </header>

        {panel !== PANEL.NONE && (
          <div className="card p-6 mb-6 animate-fade-up">
            <h2 className="font-display font-semibold text-base text-white mb-5">
              {panel === PANEL.CREATE ? "Schedule New Post" : "Edit Post"}
            </h2>
            <PostForm
              post={panel === PANEL.EDIT ? selectedPost : null}
              onSubmit={panel === PANEL.CREATE ? handleCreate : handleUpdate}
              onCancel={() => setPanel(PANEL.NONE)}
              loading={formLoading}
            />
          </div>
        )}

        <div className="mb-5">
          <FilterBar
            filter={filter}
            onChange={setFilter}
            total={posts.length}
          />
        </div>

        {error && (
          <div className="mb-5">
            <ErrorBanner message={error} onRetry={fetchPosts} />
          </div>
        )}

        {loading ? (
          <LoadingSkeleton count={4} />
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-white/30 font-body text-sm">No posts yet.</p>
            <button
              onClick={() => setPanel(PANEL.CREATE)}
              className="mt-4 text-signal/60 hover:text-signal text-sm font-mono transition-colors"
            >
              Schedule your first post →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={handleCardClick}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {selectedPost && panel === PANEL.NONE && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
          onEdit={handleEditFromModal}
          onDelete={handleDelete}
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body shadow-xl
            animate-fade-up border
            ${toast.type === "error"
              ? "bg-coral/10 border-coral/20 text-coral"
              : "bg-signal/10 border-signal/20 text-signal"
            }`}
        >
          {toast.type === "error" ? (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
