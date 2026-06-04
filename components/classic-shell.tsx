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
        <div className="utility-row">
          <span>西祠堂巷试营业</span>
          <span>今日：{formatDate(new Date().toISOString())}</span>
          <span>巷口在线：23 人</span>
          <span>
            <Link href="/about">帮助</Link> | <Link href="/revival">站长手札</Link>
          </span>
        </div>
        <div className="brand-row">
          <div>
            <h1>
              <Link href="/">西祠堂巷</Link>
            </h1>
            <p>自由开版 · 自主管理 · 慢慢回帖</p>
          </div>
          <div className="brand-note">
            <strong>中文旧网复兴实验</strong>
            <br />
            不复制旧站数据，不导入历史用户，不使用旧站 Logo 或商标资产。
          </div>
          <div className="auth-line">
            {profile ? (
              <form action={logoutAction}>
                <span>
                  {profile.display_name}（{profile.username}）
                </span>{" "}
                <button type="submit">退出</button>
              </form>
            ) : (
              <>
                <Link href="/login">进巷</Link> | <Link href="/register">注册巷口 ID</Link>
              </>
            )}
          </div>
        </div>
        <nav className="nav-row" aria-label="主导航">
          <Link href="/">胡同口</Link>
          <Link href="/boards">讨论版目录</Link>
          <Link href="/boards?category=city">城市巷子</Link>
          <Link href="/boards?category=life">生活茶馆</Link>
          <Link href="/boards?category=interest">兴趣小版</Link>
          <Link href="/apply">申请开版</Link>
          <Link href="/about">本站说明</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
