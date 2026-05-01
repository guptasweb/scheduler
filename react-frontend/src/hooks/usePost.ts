import { useState, useEffect, useCallback } from "react";
import { postsApi } from "../api/posts";
import type { Post } from "../types";

export function usePost(id?: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await postsApi.get(id);
      setPost(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error, refetch: fetchPost };
}

