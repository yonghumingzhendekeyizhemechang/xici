import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentProfile } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function ClassicShell({ children }: { children: ReactNode }) {
  const profile = await getCurrentProfile();

  return (
    <div className="site-shell">
      <header className="topbar">
        <table className="mast-table" aria-label="站点头部">
          <tbody>
            <tr>
              <td className="xici-mark" rowSpan={2}>
                <Link href="/">西祠堂巷</Link>
                <br />
                <span>试营业</span>
              </td>
              <td className="top-links">
                <strong>
                  <Link href="/">胡同口</Link>
                </strong>
                <span>|</span>
                <b className="tone-orange">人群</b>：
                <Link href="/boards?category=old-web">新人类</Link>
                <span>|</span>
                <Link href="/boards?category=life">男人</Link>
                <span>|</span>
                <Link href="/boards?category=life">女人</Link>
                <span>|</span>
                <b className="tone-green">地区</b>：
                <Link href="/boards?category=city">南京</Link>
                <span>|</span>
                <Link href="/boards?category=city">北京</Link>
                <span>|</span>
                <Link href="/boards?category=city">上海</Link>
                <span>|</span>
                <Link href="/boards?category=city">杭州</Link>
                <span>|</span>
                <b>伙伴</b>
                <span>|</span>
                <Link className="tone-blue" href="/boards">排行</Link>
                <span>|</span>
                <Link className="tone-blue" href="/about">帮助</Link>
                <span className="top-date">今日：{formatDate(new Date().toISOString())}</span>
              </td>
            </tr>
            <tr>
              <td className="top-links sub">
                <Link href="/boards?category=interest">时尚</Link>
                <span>|</span>
                <Link href="/boards?category=interest">数码</Link>
                <span>|</span>
                <Link className="tone-red" href="/boards?category=old-web">记者</Link>
                <span>|</span>
                <Link href="/boards?category=city">旅游</Link>
                <span>|</span>
                <Link href="/boards?category=life">业主</Link>
                <span>|</span>
                <Link href="/boards?category=old-web">IT</Link>
                <span>|</span>
                <Link href="/boards?category=life">生活</Link>
                <span>|</span>
                <Link href="/boards?category=interest">人文</Link>
                <span>|</span>
                <Link href="/boards?category=interest">文学</Link>
                <span>|</span>
                <Link href="/boards?category=interest">娱乐</Link>
                <span>|</span>
                <Link href="/boards?category=interest">体育</Link>
                <span>|</span>
                <Link href="/boards">杂院</Link>
                <span>|</span>
                <Link href="/apply">新建讨论版</Link>
                <span>|</span>
                {profile ? (
                  <form className="inline-form" action={logoutAction}>
                    {profile.display_name} <button type="submit">退出</button>
                  </form>
                ) : (
                  <>
                    <Link href="/login">进巷</Link>
                    <span>|</span>
                    <Link href="/register">注册巷口 ID</Link>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      {children}
    </div>
  );
}
