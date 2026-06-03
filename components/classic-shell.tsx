import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentProfile } from "@/lib/data";

export async function ClassicShell({ children }: { children: ReactNode }) {
  const profile = await getCurrentProfile();

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-row">
          <div>
            <h1>
              <Link href="/">西祠堂巷</Link>
            </h1>
            <p>一个中文旧网复兴实验</p>
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
          <Link href="/">巷口首页</Link>
          <Link href="/boards">巷口爬行榜</Link>
          <Link href="/apply">申请开巷</Link>
          <Link href="/about">关于</Link>
          <Link href="/revival">旧网复兴</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
