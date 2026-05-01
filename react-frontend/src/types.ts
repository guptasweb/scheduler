export type PostStatus = "scheduled" | "published" | "cancelled";

export type DateStatus =
  | PostStatus
  | "overdue"
  | "today"
  | "upcoming"
  | "unknown";

export type ScopeFilter = "" | "upcoming" | "past";

export type PostsFilter = {
  scope?: ScopeFilter;
  status?: PostStatus;
};

export type Photo = {
  id: number;
  post_id?: number;
  image_url: string;
  caption?: string | null;
  created_at?: string;
};

export type Post = {
  id: number;
  title: string;
  post_text: string;
  scheduled_date: string | null;
  status: PostStatus;
  past_due?: boolean;
  photos?: Photo[];
  created_at?: string;
  updated_at?: string;
};

export type PostFormData = {
  title: string;
  post_text: string;
  scheduled_date: string;
  status?: PostStatus;
};

