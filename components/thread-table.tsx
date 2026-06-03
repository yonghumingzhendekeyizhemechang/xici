import Link from "next/link";
import type { ThreadSummary } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ThreadTable({ threads }: { threads: ThreadSummary[] }) {
  if (!threads.length) {
    return <p className="status-line">巷子刚开，第一批老网民还在路上。</p>;
  }

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          <th>状态</th>
          <th>标题</th>
          <th>作者</th>
          <th>回应</th>
          <th>人气</th>
          <th>最后回复</th>
        </tr>
      </thead>
      <tbody>
        {threads.map((thread) => (
          <tr key={thread.id}>
            <td data-label="状态">
              {thread.is_pinned ? <span className="tag">置顶</span> : null}
              {thread.is_featured ? <span className="tag">精华</span> : null}
              {thread.is_locked ? <span className="tag">锁定</span> : null}
              {!thread.is_pinned && !thread.is_featured && !thread.is_locked ? "普通" : null}
            </td>
            <td data-label="标题">
              <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
              {thread.board_name ? (
                <span className="muted">　[{thread.board_name}]</span>
              ) : null}
            </td>
            <td data-label="作者">{thread.author_name}</td>
            <td data-label="回应">{thread.reply_count}</td>
            <td data-label="人气">{thread.view_count}</td>
            <td data-label="最后回复">{formatDate(thread.last_replied_at || thread.created_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
