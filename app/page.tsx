import Link from "next/link";
import { Notice, Panel } from "@/components/panel";
import { ThreadTable } from "@/components/thread-table";
import { getHomeData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const { categories, boards, latestThreads, hotThreads } = await getHomeData();

  return (
    <main className="stack">
      <table className="ad-row" aria-label="通栏信息">
        <tbody>
          <tr>
            <td>
              <b>西祠堂巷</b> 复兴试营业
            </td>
            <td>不是旧站官方重启，不导入历史用户</td>
            <td>
              <Link href="/apply">申请新版，一分钟填好</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="path-row" aria-label="当前位置">
        <tbody>
          <tr>
            <td className="path-main">
              当前位置：<Link href="/">胡同口</Link>
            </td>
            <td className="path-tools">
              <Link href="/boards">收藏</Link>　
              <Link href="/boards">社区模式</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <section className="headline-block">
        <div className="headline-photo">
          <div className="photo-placeholder">
            <span>胡同口</span>
            <br />
            今日巷报
          </div>
          <Link className="new-board-link" href="/apply">
            新建讨论版，一分钟搞定 &#9658;
          </Link>
        </div>

        <div className="headline-summary">
          <small>胡同口[摘要]</small>
          <h2>
            <Link href={`/threads/${latestThreads[0]?.id || "thread-baodao"}`}>
              {latestThreads[0]?.title || "报个到，看看还有多少老网民"}
            </Link>
          </h2>
          <p>{latestThreads[0]?.content || "巷子刚开，先留一条口信，等第一批老网民回来。"}</p>
          <div className="head-hr" />
          <small>胡同口[摘要]</small>
          <h2>
            <Link href={`/threads/${latestThreads[1]?.id || "thread-mail"}`}>
              {latestThreads[1]?.title || "还有人记得注册论坛要等邮件验证吗"}
            </Link>
          </h2>
          <p>{latestThreads[1]?.content || "那时候发帖像往巷口贴纸条，第二天回来看看有没有人接话。"}</p>
        </div>

        <div className="headline-event">
          <div className="event-title">巷口告示</div>
          <ul>
            <li>
              <Link href="/about">本站非官方声明</Link>
            </li>
            <li>
              <Link href="/revival">为什么重新搭一个巷口</Link>
            </li>
            <li>
              <Link href="/apply">申请一条自己的巷子</Link>
            </li>
            <li>
              <Link href="/boards">讨论版排行榜</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="xici-home-grid">
        <div className="home-main stack">
          <Panel title="胡同口推荐帖">
            <ThreadTable threads={latestThreads.slice(0, 10)} />
          </Panel>

          <Panel title="讨论版分类">
            <table className="directory-table">
              <tbody>
                {categories.map((category) => {
                  const categoryBoards = boards.filter((board) => board.category_slug === category.slug);
                  return (
                    <tr key={category.id}>
                      <td className="category-cell">
                        <Link href={`/boards?category=${category.slug}`}>{category.name}</Link>
                      </td>
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
        </div>

        <aside className="home-side stack">
          <Panel title="推荐讨论版">
            <ul className="compact-list">
              {boards.slice(0, 8).map((board) => (
                <li key={board.id}>
                  <Link href={`/boards/${board.slug}`}>{board.name}</Link>
                  <span className="muted"> ({board.favorite_count})</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="最热话题">
            <ul className="compact-list">
              {hotThreads.slice(0, 8).map((thread) => (
                <li key={thread.id}>
                  <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </section>

      <Notice>
        本项目只是一个中文旧网复兴实验：可以开版，可以回帖，可以认门，也可以慢慢等人回来。页面风格会尽量保留旧论坛的小字号、浅蓝栏、红色强调和窄版入口感。
      </Notice>
    </main>
  );
}
