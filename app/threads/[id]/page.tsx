import Link from "next/link";
import { notFound } from "next/navigation";
import { replyAction } from "@/app/actions/content";
import { Notice, Panel } from "@/components/panel";
import { getCurrentProfile, getThreadDetail } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type ThreadPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
};

export default async function ThreadPage({ params, searchParams }: ThreadPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const detail = await getThreadDetail(id);
  const profile = await getCurrentProfile();
  if (!detail) notFound();

  const { thread, board, posts } = detail;

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; <Link href="/boards">巷口爬行榜</Link> &gt;{" "}
        <Link href={`/boards/${board.slug}`}>{board.name}</Link> &gt; {thread.title}
      </div>

      {query?.error ? <Notice>{query.error}</Notice> : null}

      <article className="thread-post">
        <header>
          <div className="floor-meta">
            1 楼
            <br />
            {thread.author_name}
            <br />
            {formatDate(thread.created_at)}
          </div>
          <div className="post-title">
            {thread.title}
            <br />
            <span className="muted">
              所属版块：{board.name}　浏览：{thread.view_count}
            </span>
          </div>
        </header>
        <div className="post-content">{thread.content}</div>
      </article>

      {posts.map((post) => (
        <article className="thread-post" key={post.id}>
          <header>
            <div className="floor-meta">
              {post.floor_no} 楼
              <br />
              {post.author_name}
              <br />
              {formatDate(post.created_at)}
            </div>
            <div className="post-title">回应</div>
          </header>
          <div className="post-content">{post.content}</div>
        </article>
      ))}

      <Panel title="回帖框">
        {thread.is_locked ? (
          <p className="status-line">这个帖子已经锁定，不能再回帖。</p>
        ) : profile ? (
          <form className="classic-form" action={replyAction}>
            <input type="hidden" name="thread_id" value={thread.id} />
            <label>
              内容
              <textarea name="content" required />
            </label>
            <button type="submit">回帖</button>
          </form>
        ) : (
          <p className="status-line">
            未登录用户可以看帖。要回帖，请先 <Link href="/login">进巷</Link>。
          </p>
        )}
      </Panel>

      <p>
        <Link href={`/boards/${board.slug}`}>返回版块</Link>
      </p>
    </main>
  );
}
