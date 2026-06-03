export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
};

export type BoardSummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  board_no: number;
  category: string;
  category_slug?: string;
  moderators: string[];
  announcement?: string | null;
  created_at: string;
  thread_count: number;
  reply_count: number;
  favorite_count: number;
  last_replied_at?: string | null;
};

export type ThreadSummary = {
  id: string;
  board_id: string;
  board_slug: string;
  board_name: string;
  title: string;
  content?: string;
  author_name: string;
  created_at: string;
  last_replied_at?: string | null;
  view_count: number;
  reply_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_featured: boolean;
};

export type PostSummary = {
  id: string;
  floor_no: number;
  author_name: string;
  content: string;
  created_at: string;
};

export type ThreadDetail = {
  thread: ThreadSummary & { content: string };
  board: BoardSummary;
  posts: PostSummary[];
};

export type CurrentProfile = {
  id: string;
  username: string;
  display_name: string;
  role: string;
};
