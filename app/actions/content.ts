"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/utils";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function createThreadAction(formData: FormData) {
  const boardSlug = text(formData, "board_slug");
  const title = text(formData, "title");
  const content = text(formData, "content");
  const returnPath = `/boards/${boardSlug}`;

  if (!title || !content) fail(returnPath, "标题和正文都要写。");

  const supabase = await createSupabaseServerClient();
  if (!supabase) fail(returnPath, "Supabase 环境变量还没配置好。");

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnPath)}`);

  const { data: board } = await supabase
    .from("boards")
    .select("id")
    .eq("slug", boardSlug)
    .eq("status", "active")
    .single();

  if (!board) fail(returnPath, "没有找到这条巷子。");

  const { data: thread, error } = await supabase
    .from("threads")
    .insert({
      board_id: board.id,
      author_id: user.id,
      title,
      content,
      last_replied_at: new Date().toISOString()
    })
    .select("id")
    .single();

  if (error || !thread) fail(returnPath, error?.message || "发帖失败。");

  revalidatePath(returnPath);
  redirect(`/threads/${thread.id}`);
}

export async function replyAction(formData: FormData) {
  const threadId = text(formData, "thread_id");
  const content = text(formData, "content");
  const returnPath = `/threads/${threadId}`;
  if (!content) fail(returnPath, "回帖不能是空的。");

  const supabase = await createSupabaseServerClient();
  if (!supabase) fail(returnPath, "Supabase 环境变量还没配置好。");

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnPath)}`);

  const { data: thread } = await supabase
    .from("threads")
    .select("id, board_id, reply_count, is_locked")
    .eq("id", threadId)
    .eq("status", "published")
    .single();

  if (!thread) fail(returnPath, "帖子不见了。");
  if (thread.is_locked) fail(returnPath, "这个帖子已经锁了，不能再回。");

  const { data: lastPost } = await supabase
    .from("posts")
    .select("floor_no")
    .eq("thread_id", threadId)
    .order("floor_no", { ascending: false })
    .limit(1)
    .maybeSingle();

  const floorNo = Math.max(2, (lastPost?.floor_no || 1) + 1);

  const { error } = await supabase.from("posts").insert({
    thread_id: thread.id,
    board_id: thread.board_id,
    author_id: user.id,
    content,
    floor_no: floorNo
  });

  if (error) fail(returnPath, error.message);

  await supabase
    .from("threads")
    .update({
      reply_count: (thread.reply_count || 0) + 1,
      last_replied_at: new Date().toISOString()
    })
    .eq("id", thread.id);

  revalidatePath(returnPath);
  redirect(returnPath);
}

export async function toggleFavoriteAction(formData: FormData) {
  const boardId = text(formData, "board_id");
  const boardSlug = text(formData, "board_slug");
  const returnPath = `/boards/${boardSlug}`;

  const supabase = await createSupabaseServerClient();
  if (!supabase) fail(returnPath, "Supabase 环境变量还没配置好。");

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnPath)}`);

  const { data: favorite } = await supabase
    .from("favorites")
    .select("id")
    .eq("board_id", boardId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (favorite) {
    await supabase.from("favorites").delete().eq("id", favorite.id);
  } else {
    await supabase.from("favorites").insert({ board_id: boardId, user_id: user.id });
  }

  revalidatePath(returnPath);
  redirect(returnPath);
}

export async function applyBoardAction(formData: FormData) {
  const boardName = text(formData, "board_name");
  const applicantName = text(formData, "applicant_name");
  const intro = text(formData, "intro");
  const reason = text(formData, "reason");
  const topics = text(formData, "topics");
  const management = text(formData, "management");
  const contact = text(formData, "contact");
  const wantsToModerate = formData.get("wants_to_moderate") === "on";
  const returnPath = "/apply";

  if (!boardName || !intro || !reason || !topics || !management) {
    fail(returnPath, "除了联系方式，其余几项都要写一点。");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) fail(returnPath, "Supabase 环境变量还没配置好。");

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !applicantName) fail(returnPath, "未登录时请留一个称呼。");

  const { error } = await supabase.from("board_applications").insert({
    applicant_id: user?.id || null,
    applicant_name: applicantName || "已登录用户",
    contact: contact || null,
    board_name: boardName,
    board_slug: slugify(boardName),
    reason: `${intro}\n\n为什么想开：${reason}`,
    plan: `准备聊什么：${topics}\n\n准备怎么管理：${management}`,
    wants_to_moderate: wantsToModerate
  });

  if (error) fail(returnPath, error.message);

  redirect("/apply?submitted=1");
}
