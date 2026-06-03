import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { Notice, Panel } from "@/components/panel";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; registered?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const query = await searchParams;

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 进巷
      </div>

      {query?.registered ? <Notice>巷口 ID 已经登记好，可以进巷了。</Notice> : null}
      {query?.error ? <Notice>{query.error}</Notice> : null}

      <Panel title="欢迎回到巷口">
        <form className="classic-form" action={loginAction}>
          <label>
            巷口 ID 或邮箱
            <input name="identifier" autoComplete="username" required />
          </label>
          <label>
            暗号
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">进巷</button>
        </form>
        <p className="status-line">
          还没有 ID？<Link href="/register">现在注册一个。</Link>
        </p>
      </Panel>
    </main>
  );
}
