import Link from "next/link";
import { BoardTable } from "@/components/board-table";
import { Notice, Panel } from "@/components/panel";
import { ThreadTable } from "@/components/thread-table";
import { getHomeData } from "@/lib/data";

export default async function HomePage() {
  const { categories, boards, latestThreads, hotThreads } = await getHomeData();

  return (
    <main className="stack">
      <Notice>
        <strong>西祠堂巷</strong>　一个中文旧网复兴实验。可以开版，可以回帖，可以认门，也可以慢慢等人回来。
        <br />
        本站不是任何旧站的官方重启，不复制旧站数据，不导入历史用户。
      </Notice>

      <section className="gate-grid">
        <Panel title="胡同口分类目录">
          <table className="directory-table">
            <tbody>
              {categories.map((category) => {
                const categoryBoards = boards.filter((board) => board.category_slug === category.slug);
                return (
                  <tr key={category.id}>
                    <th>
                      <Link href={`/boards?category=${category.slug}`}>{category.name}</Link>
                    </th>
                    <td>
                      {categoryBoards.slice(0, 5).map((board) => (
                        <span className="board-chip" key={board.id}>
                          <Link href={`/boards/${board.slug}`}>{board.name}</Link>
                          <span className="muted">({board.board_no})</span>
                        </span>
                      ))}
                      {!categoryBoards.length ? <span className="muted">待开张</span> : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <Panel title="巷口告示">
          <ul className="compact-list">
            <li>自由开版，自主管理，先申请，后试营业。</li>
            <li>不使用旧站商标资产，不导入旧站数据。</li>
            <li>移动端可读可点，PC 端保留旧网密度。</li>
          </ul>
          <p>
            <Link className="bbs-button" href="/apply">
              申请开版
            </Link>
          </p>
        </Panel>
      </section>

      <section className="portal-grid">
        <div className="stack">
          <Panel title="最新话题" aside={<Link href="/boards">全部讨论版</Link>}>
            <ThreadTable threads={latestThreads.slice(0, 10)} />
          </Panel>

          <Panel title="最热话题">
            <ThreadTable threads={hotThreads.slice(0, 10)} />
          </Panel>
        </div>

        <aside className="stack">
          <Panel title="热门版块">
            <BoardTable boards={boards.slice(0, 8)} />
          </Panel>

          <Panel title="站长手札">
            <ul className="compact-list">
              <li>先把入口页做得像旧网。</li>
              <li>等第一批巷子认门。</li>
              <li>下一步补后台和斑竹治理。</li>
            </ul>
          </Panel>
        </aside>
      </section>
    </main>
  );
}
