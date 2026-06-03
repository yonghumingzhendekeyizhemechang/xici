import Link from "next/link";
import { applyBoardAction } from "@/app/actions/content";
import { Notice, Panel } from "@/components/panel";

type ApplyPageProps = {
  searchParams?: Promise<{ error?: string; submitted?: string }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const query = await searchParams;

  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 开巷申请
      </div>

      {query?.submitted ? (
        <Notice>开巷申请已经递到巷口。站长会人工查看，合适的巷子会先试营业。</Notice>
      ) : null}
      {query?.error ? <Notice>{query.error}</Notice> : null}

      <Panel title="开巷申请">
        <form className="classic-form" action={applyBoardAction}>
          <label>
            你的称呼（未登录时必填）
            <input name="applicant_name" />
          </label>
          <label>
            想开的巷子名称
            <input name="board_name" required />
          </label>
          <label>
            简短介绍
            <textarea name="intro" required />
          </label>
          <label>
            为什么想开
            <textarea name="reason" required />
          </label>
          <label>
            准备聊什么
            <textarea name="topics" required />
          </label>
          <label>
            你准备怎么管理
            <textarea name="management" required />
          </label>
          <label>
            联系方式，可选
            <input name="contact" />
          </label>
          <label>
            <span>
              <input name="wants_to_moderate" type="checkbox" defaultChecked /> 愿意担任斑竹
            </span>
          </label>
          <button type="submit">递到巷口</button>
        </form>
      </Panel>
    </main>
  );
}
