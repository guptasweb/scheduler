import type { Photo } from "../types";
import { apiClient } from "./client";

export const photosApi = {
  list: (postId: number) =>
    apiClient.get<Photo[]>(`/posts/${postId}/photos`).then((r) => r.data),
  create: (
    postId: number,
    data: Pick<Photo, "caption"> & { image_url: string }
  ) =>
    apiClient
      .post<Photo>(`/posts/${postId}/photos`, { photo: data })
      .then((r) => r.data),
  delete: (postId: number, photoId: number) =>
    apiClient
      .delete(`/posts/${postId}/photos/${photoId}`)
      .then((r) => r.data),
};
