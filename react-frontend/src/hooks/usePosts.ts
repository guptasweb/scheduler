import { useState, useEffect, useCallback } from "react";
import { postsApi } from "../api/posts";
import type { Post, PostFormData, PostsFilter } from "../types";

/**
 * Custom hook that owns all post data state and API interactions.
 * Components consume this hook rather than calling the API directly.
 */
export function usePosts(initialFilter: PostsFilter = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<PostsFilter>(initialFilter);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsApi.list(filter);
      setPosts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = useCallback(async (postData: PostFormData) => {
    const newPost = await postsApi.create(postData);
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback(async (id: number, postData: PostFormData) => {
    const updated = await postsApi.update(id, postData);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deletePost = useCallback(async (id: number) => {
    await postsApi.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    posts,
    loading,
    error,
    filter,
    setFilter,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}

