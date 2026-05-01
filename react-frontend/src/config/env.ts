/** Base URL for the JSON API (no trailing slash). Override per environment via Vite. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";
