import Link from "next/link";
import { notFound } from "next/navigation";
import { createThreadAction, toggleFavoriteAction } from "@/app/actions/content";
import { Notice, Panel } from "@/components/panel";
import { ThreadTable } from "@/components/thread-table";
import { getBoardDetail } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const data = await getBoardDetail(slug);
  if (!data) notFound();

  const { board, threads, currentProfile, isFavorited } = data;

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; <Link href="/boards">巷口爬行榜</Link> &gt; {board.name}
      </div>

      {query?.error ? <Notice>{query.error}</Notice> : null}

      <Panel title="版块头部">
        <div className="board-header">
          <div>
            <h2>{board.name}</h2>
            <p>{board.description}</p>
            <p className="status-line">
              版号：{board.board_no}　分类：{board.category}　创建时间：{formatDate(board.created_at)}
              <br />
              帖子数：{board.thread_count}　回帖数：{board.reply_count}　预定人数：{board.favorite_count}
              <br />
              斑竹：{board.moderators.join("、") || "待认领"}
            </p>
          </div>
          <form action={toggleFavoriteAction}>
            <input type="hidden" name="board_id" value={board.id} />
            <input type="hidden" name="board_slug" value={board.slug} />
            <button className="bbs-button" type="submit">
              {isFavorited ? "取消认门" : "预定 / 认门"}
            </button>
          </form>
        </div>
      </Panel>

      <Panel title="版块公告">
        <p>{board.announcement || "斑竹还没写公告。"}</p>
      </Panel>

      <Panel title="帖子列表" aside="第 1 页">
        <ThreadTable threads={threads} />
      </Panel>

      <Panel title="发帖入口">
        {currentProfile ? (
          <form className="classic-form" action={createThreadAction}>
            <input type="hidden" name="board_slug" value={board.slug} />
            <label>
              标题
              <input name="title" maxLength={120} required />
            </label>
            <label>
              正文
              <textarea name="content" required />
            </label>
            <button type="submit">发帖</button>
          </form>
        ) : (
          <p className="status-line">
            先 <Link href="/login">进巷</Link> 或 <Link href="/register">注册巷口 ID</Link>，就能在这里发帖。
          </p>
        )}
      </Panel>
    </main>
  );
}
