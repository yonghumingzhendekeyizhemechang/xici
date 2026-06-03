import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  fallbackBoards,
  fallbackCategories,
  fallbackThreadDetail,
  fallbackThreads
} from "@/lib/fallback-data";
import type {
  BoardSummary,
  Category,
  CurrentProfile,
  ThreadDetail,
  ThreadSummary
} from "@/lib/types";

type AnyRecord = Record<string, any>;

function profileName(profile: AnyRecord | null | undefined) {
  return profile?.display_name || profile?.username || "路过的人";
}

function mapBoard(row: AnyRecord): BoardSummary {
  const threads = Array.isArray(row.threads) ? row.threads : [];
  const favorites = Array.isArray(row.favorites) ? row.favorites : [];
  const members = Array.isArray(row.board_members) ? row.board_members : [];
  const last = threads
    .map((thread: AnyRecord) => thread.last_replied_at || thread.created_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    board_no: row.board_no,
    category: row.categories?.name || "未分类",
    category_slug: row.categories?.slug,
    moderators: members
      .filter((member: AnyRecord) => member.role === "owner" || member.role === "moderator")
      .map((member: AnyRecord) => profileName(member.profiles)),
    announcement: row.announcement,
    created_at: row.created_at,
    thread_count: threads.length,
    reply_count: threads.reduce((sum: number, thread: AnyRecord) => sum + (thread.reply_count || 0), 0),
    favorite_count: favorites.length,
    last_replied_at: last || row.updated_at
  };
}

function mapThread(row: AnyRecord): ThreadSummary {
  return {
    id: row.id,
    board_id: row.board_id,
    board_slug: row.boards?.slug || "",
    board_name: row.boards?.name || "",
    title: row.title,
    content: row.content,
    author_name: profileName(row.profiles),
    created_at: row.created_at,
    last_replied_at: row.last_replied_at,
    view_count: row.view_count || 0,
    reply_count: row.reply_count || 0,
    is_pinned: Boolean(row.is_pinned),
    is_locked: Boolean(row.is_locked),
    is_featured: Boolean(row.is_featured)
  };
}

async function getClient() {
  return createSupabaseServerClient();
}

export const getCurrentProfile = cache(async (): Promise<CurrentProfile | null> => {
  const supabase = await getClient();
  if (!supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return data || null;
});

export const getHomeData = cache(async () => {
  const supabase = await getClient();
  if (!supabase) {
    return {
      categories: fallbackCategories,
      boards: fallbackBoards,
      latestThreads: fallbackThreads,
      hotThreads: [...fallbackThreads].sort((a, b) => b.view_count - a.view_count)
    };
  }

  const [{ data: categories }, { data: boards }, { data: latestThreads }, { data: hotThreads }] =
    await Promise.all([
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("boards")
        .select(
          "*, categories(name, slug), favorites(id), threads(id, reply_count, last_replied_at, created_at), board_members(role, profiles!board_members_user_id_fkey(display_name, username))"
        )
        .eq("status", "active")
        .eq("visibility", "public")
        .order("board_no", { ascending: true }),
      supabase
        .from("threads")
        .select("*, boards(name, slug), profiles!threads_author_id_fkey(display_name, username)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("threads")
        .select("*, boards(name, slug), profiles!threads_author_id_fkey(display_name, username)")
        .eq("status", "published")
        .order("view_count", { ascending: false })
        .limit(12)
    ]);

  return {
    categories: (categories || []) as Category[],
    boards: (boards || []).map(mapBoard),
    latestThreads: (latestThreads || []).map(mapThread),
    hotThreads: (hotThreads || []).map(mapThread)
  };
});

export const getBoardsData = cache(async (categorySlug?: string) => {
  const home = await getHomeData();
  const boards = categorySlug
    ? home.boards.filter((board) => board.category_slug === categorySlug)
    : home.boards;

  return {
    categories: home.categories,
    boards,
    latestBoards: [...home.boards].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 8),
    recentBoards: [...home.boards].sort((a, b) => (b.last_replied_at || "").localeCompare(a.last_replied_at || "")).slice(0, 8)
  };
});

export const getBoardDetail = cache(async (slug: string) => {
  const supabase = await getClient();
  if (!supabase) {
    const board = fallbackBoards.find((item) => item.slug === slug) || fallbackBoards[0];
    return {
      board,
      threads: fallbackThreads.filter((thread) => thread.board_slug === board.slug),
      isFavorited: false,
      currentProfile: null
    };
  }

  const { data: boardRow } = await supabase
    .from("boards")
    .select(
      "*, categories(name, slug), favorites(id), threads(id, reply_count, last_replied_at, created_at), board_members(role, profiles!board_members_user_id_fkey(display_name, username))"
    )
    .eq("slug", slug)
    .eq("status", "active")
    .eq("visibility", "public")
    .maybeSingle();

  if (!boardRow) return null;

  const board = mapBoard(boardRow);
  const currentProfile = await getCurrentProfile();

  const [{ data: threads }, { data: favorite }] = await Promise.all([
    supabase
      .from("threads")
      .select("*, boards(name, slug), profiles!threads_author_id_fkey(display_name, username)")
      .eq("board_id", board.id)
      .eq("status", "published")
      .order("is_pinned", { ascending: false })
      .order("last_replied_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false }),
    currentProfile
      ? supabase
          .from("favorites")
          .select("id")
          .eq("board_id", board.id)
          .eq("user_id", currentProfile.id)
          .maybeSingle()
      : Promise.resolve({ data: null })
  ]);

  return {
    board,
    threads: (threads || []).map(mapThread),
    isFavorited: Boolean(favorite),
    currentProfile
  };
});

export const getThreadDetail = cache(async (id: string): Promise<ThreadDetail | null> => {
  const supabase = await getClient();
  if (!supabase) {
    if (id === fallbackThreadDetail.thread.id) return fallbackThreadDetail;
    const thread = fallbackThreads.find((item) => item.id === id) || fallbackThreads[0];
    const board = fallbackBoards.find((item) => item.slug === thread.board_slug) || fallbackBoards[0];
    return { thread: thread as ThreadDetail["thread"], board, posts: fallbackThreadDetail.posts };
  }

  const { data: threadRow } = await supabase
    .from("threads")
    .select("*, boards(*, categories(name, slug)), profiles!threads_author_id_fkey(display_name, username)")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (!threadRow || !threadRow.boards) return null;

  await supabase
    .from("threads")
    .update({ view_count: (threadRow.view_count || 0) + 1 })
    .eq("id", id);

  const [{ data: posts }, { data: boardRelations }] = await Promise.all([
    supabase
      .from("posts")
      .select("*, profiles!posts_author_id_fkey(display_name, username)")
      .eq("thread_id", id)
      .eq("status", "published")
      .order("floor_no", { ascending: true }),
    supabase
      .from("boards")
      .select(
        "*, categories(name, slug), favorites(id), threads(id, reply_count, last_replied_at, created_at), board_members(role, profiles!board_members_user_id_fkey(display_name, username))"
      )
      .eq("id", threadRow.board_id)
      .single()
  ]);

  return {
    thread: mapThread(threadRow) as ThreadDetail["thread"],
    board: mapBoard(boardRelations || threadRow.boards),
    posts: (posts || []).map((post: AnyRecord) => ({
      id: post.id,
      floor_no: post.floor_no,
      author_name: profileName(post.profiles),
      content: post.content,
      created_at: post.created_at
    }))
  };
});
