import type { Post, PostFormData, PostsFilter } from "../types";
import { apiClient } from "./client";

export const postsApi = {
  list: (params: PostsFilter = {}) =>
    apiClient.get<Post[]>("/posts", { params }).then((r) => r.data),
  get: (id: number) => apiClient.get<Post>(`/posts/${id}`).then((r) => r.data),
  create: (data: PostFormData) =>
    apiClient.post<Post>("/posts", { post: data }).then((r) => r.data),
  update: (id: number, data: PostFormData) =>
    apiClient.patch<Post>(`/posts/${id}`, { post: data }).then((r) => r.data),
  delete: (id: number) => apiClient.delete(`/posts/${id}`).then((r) => r.data),
};
