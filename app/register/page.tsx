import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { Notice, Panel } from "@/components/panel";

type RegisterPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const query = await searchParams;

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 注册巷口 ID
      </div>

      {query?.error ? <Notice>{query.error}</Notice> : null}

      <Panel title="注册一个巷口 ID">
        <form className="classic-form" action={registerAction}>
          <label>
            username
            <input name="username" minLength={3} maxLength={20} required />
          </label>
          <label>
            email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            password
            <input name="password" type="password" minLength={6} required />
          </label>
          <label>
            confirm_password
            <input name="confirm_password" type="password" minLength={6} required />
          </label>
          <label>
            display_name
            <input name="display_name" />
          </label>
          <button type="submit">注册</button>
        </form>
        <p className="status-line">邮箱只用于找回暗号，不在前台公开。</p>
      </Panel>
    </main>
  );
}
