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
                <Link href="/boards">讨论版目录</Link>
                <span>|</span>
                <Link href="/apply">新建讨论版</Link>
                <span>|</span>
                <Link href="/boards">排行榜</Link>
                <span>|</span>
                <Link href="/about">帮助</Link>
                <span className="top-date">今日：{formatDate(new Date().toISOString())}</span>
              </td>
            </tr>
            <tr>
              <td className="top-links sub">
                <Link href="/boards?category=old-web">旧网回忆</Link>
                <span>|</span>
                <Link href="/boards?category=city">城市巷子</Link>
                <span>|</span>
                <Link href="/boards?category=life">生活茶馆</Link>
                <span>|</span>
                <Link href="/boards?category=interest">兴趣小版</Link>
                <span>|</span>
                <Link href="/revival">站长手札</Link>
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
