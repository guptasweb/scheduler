import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config/env";

type ApiErrorBody = {
  error?: string;
  errors?: string[];
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.join(", ") ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
