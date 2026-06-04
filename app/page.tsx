import Link from "next/link";
import { Notice, Panel } from "@/components/panel";
import { ThreadTable } from "@/components/thread-table";
import { getHomeData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const { categories, boards, latestThreads, hotThreads } = await getHomeData();

  return (
    <main className="stack">
      <Notice>
        <strong>巷口公告：</strong>
        西祠堂巷不是任何旧站的官方重启，不复制旧站数据，不导入历史用户，不使用旧站 Logo 或商标资产。
        这里只做一个中文旧网复兴实验。
      </Notice>

      <table className="front-stats" aria-label="巷口状态">
        <tbody>
          <tr>
            <th>今日新帖</th>
            <td>17</td>
            <th>开放版块</th>
            <td>{boards.length}</td>
            <th>认门人数</th>
            <td>{boards.reduce((sum, board) => sum + board.favorite_count, 0)}</td>
            <th>下一条巷子</th>
            <td>
              <Link href="/apply">申请开版</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <section className="xici-front">
        <div className="left-rail stack">
          <Panel title="胡同口">
            <ul className="compact-list gate-links">
              <li>
                <Link href="/boards">讨论版目录</Link>
              </li>
              <li>
                <Link href="/boards?category=old-web">旧网回忆</Link>
              </li>
              <li>
                <Link href="/boards?category=city">城市巷子</Link>
              </li>
              <li>
                <Link href="/boards?category=life">生活茶馆</Link>
              </li>
              <li>
                <Link href="/boards?category=interest">兴趣小版</Link>
              </li>
              <li>
                <Link href="/apply">申请开版</Link>
              </li>
            </ul>
          </Panel>

          <Panel title="站务">
            <ul className="compact-list">
              <li>
                <Link href="/about">本站说明</Link>
              </li>
              <li>
                <Link href="/revival">旧网复兴</Link>
              </li>
              <li>移动端可读可点</li>
              <li>PC 端保留旧网密度</li>
            </ul>
          </Panel>
        </div>

        <div className="center-column stack">
          <Panel title="讨论版目录">
            <table className="directory-table">
              <thead>
                <tr>
                  <th>类别</th>
                  <th>版名</th>
                  <th>版号</th>
                  <th>斑竹</th>
                  <th>帖数</th>
                  <th>最后回复</th>
                </tr>
              </thead>
            <tbody>
              {categories.map((category) => {
                const categoryBoards = boards.filter((board) => board.category_slug === category.slug);
                return (
                  <tr key={category.id}>
                    <td className="category-cell">
                      <Link href={`/boards?category=${category.slug}`}>{category.name}</Link>
                    </td>
                    <td>
                      {categoryBoards.slice(0, 4).map((board) => (
                        <div className="board-line" key={board.id}>
                          <Link href={`/boards/${board.slug}`}>{board.name}</Link>
                          <span className="muted">　{board.description}</span>
                        </div>
                      ))}
                      {!categoryBoards.length ? <span className="muted">待开张</span> : null}
                    </td>
                    <td>{categoryBoards.slice(0, 4).map((board) => <div key={board.id}>{board.board_no}</div>)}</td>
                    <td>{categoryBoards.slice(0, 4).map((board) => <div key={board.id}>{board.moderators[0] || "待认领"}</div>)}</td>
                    <td>{categoryBoards.slice(0, 4).map((board) => <div key={board.id}>{board.thread_count}</div>)}</td>
                    <td>{categoryBoards.slice(0, 4).map((board) => <div key={board.id}>{formatDate(board.last_replied_at)}</div>)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </Panel>

          <Panel title="最新话题" aside={<Link href="/boards">全部讨论版</Link>}>
            <ThreadTable threads={latestThreads.slice(0, 10)} />
          </Panel>

          <Panel title="最热话题">
            <ThreadTable threads={hotThreads.slice(0, 10)} />
          </Panel>
        </div>

        <aside className="right-rail stack">
          <Panel title="新版申请">
            <p className="status-line">想开一条自己的讨论版，先递申请。合适的巷子会试营业。</p>
            <p>
              <Link className="bbs-button" href="/apply">
                申请开版
              </Link>
            </p>
          </Panel>

          <Panel title="热门讨论版">
            <ul className="compact-list">
              {boards.slice(0, 8).map((board) => (
                <li key={board.id}>
                  <Link href={`/boards/${board.slug}`}>{board.name}</Link>
                  <span className="muted"> ({board.favorite_count})</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="站长手札">
            <p className="status-line">先把入口做成一张密一点的胡同口目录，再慢慢把版块养起来。</p>
          </Panel>
        </aside>
      </section>
    </main>
  );
}
