import Link from "next/link";
import type { BoardSummary } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BoardTable({ boards }: { boards: BoardSummary[] }) {
  if (!boards.length) {
    return <p className="status-line">巷子刚开，第一批老网民还在路上。</p>;
  }

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          <th>版名</th>
          <th>版号</th>
          <th>简介</th>
          <th>分类</th>
          <th>斑竹</th>
          <th>帖子</th>
          <th>回帖</th>
          <th>最后回复</th>
        </tr>
      </thead>
      <tbody>
        {boards.map((board) => (
          <tr key={board.id}>
            <td className="title-cell" data-label="版名">
              <Link href={`/boards/${board.slug}`}>{board.name}</Link>
            </td>
            <td data-label="版号">{board.board_no}</td>
            <td data-label="简介">{board.description}</td>
            <td data-label="分类">{board.category}</td>
            <td data-label="斑竹">{board.moderators.join("、") || "待认领"}</td>
            <td data-label="帖子">{board.thread_count}</td>
            <td data-label="回帖">{board.reply_count}</td>
            <td data-label="最后回复">{formatDate(board.last_replied_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
