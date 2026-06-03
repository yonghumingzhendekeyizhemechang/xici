import Link from "next/link";
import { BoardTable } from "@/components/board-table";
import { Panel } from "@/components/panel";
import { getBoardsData } from "@/lib/data";

type BoardsPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function BoardsPage({ searchParams }: BoardsPageProps) {
  const params = await searchParams;
  const { categories, boards, latestBoards, recentBoards } = await getBoardsData(params?.category);

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 巷口爬行榜
      </div>

      <Panel title="分类筛选">
        <Link href="/boards">全部</Link>
        {categories.map((category) => (
          <span key={category.id}>
            　|　<Link href={`/boards?category=${category.slug}`}>{category.name}</Link>
          </span>
        ))}
      </Panel>

      <Panel title="热门讨论版">
        <BoardTable boards={boards} />
      </Panel>

      <div className="main-grid">
        <Panel title="最新开张">
          <BoardTable boards={latestBoards} />
        </Panel>
        <Panel title="最近有回复">
          <BoardTable boards={recentBoards} />
        </Panel>
      </div>

      <Panel title="开巷申请入口">
        <p className="status-line">没有看到合适的巷子？可以自己申请开一条。</p>
        <Link className="bbs-button" href="/apply">
          申请开巷
        </Link>
      </Panel>
    </main>
  );
}
