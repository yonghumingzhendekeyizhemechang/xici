import Link from "next/link";
import { BoardTable } from "@/components/board-table";
import { Notice, Panel } from "@/components/panel";
import { ThreadTable } from "@/components/thread-table";
import { getHomeData } from "@/lib/data";

export default async function HomePage() {
  const { categories, boards, latestThreads, hotThreads } = await getHomeData();

  return (
    <main className="main-grid">
      <div className="stack">
        <Notice>
          <strong>西祠堂巷</strong>
          <br />
          可以开版，可以回帖，可以认门，也可以慢慢等人回来。
          <br />
          西祠堂巷不是任何旧站的官方重启，不复制旧站数据，不导入历史用户。
        </Notice>

        <Panel title="站内公告">
          <p>
            巷口试营业中。这里复刻的是中文老论坛的视觉气质和人人能开讨论版的感觉，不使用任何旧站
            Logo、商标或历史资料。
          </p>
        </Panel>

        <Panel title="最新话题" aside={<Link href="/boards">看全部版块</Link>}>
          <ThreadTable threads={latestThreads.slice(0, 8)} />
        </Panel>

        <Panel title="最热话题">
          <ThreadTable threads={hotThreads.slice(0, 8)} />
        </Panel>
      </div>

      <aside className="stack">
        <Panel title="热门讨论版">
          <BoardTable boards={boards.slice(0, 6)} />
        </Panel>

        <Panel title="分类入口">
          <ul className="compact-list">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/boards?category=${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="开巷申请入口">
          <p className="status-line">
            想开一条自己的讨论版，可以先递申请。合适的巷子会先试营业。
          </p>
          <Link className="bbs-button" href="/apply">
            申请开一条自己的巷子
          </Link>
        </Panel>

        <Panel title="友情链接 / 站长手札">
          <ul className="compact-list">
            <li>巷口手札：先把灯点起来</li>
            <li>旧网备忘：慢一点也能聊</li>
            <li>友链位：等待第一批邻居</li>
          </ul>
        </Panel>
      </aside>
    </main>
  );
}
