import Link from "next/link";
import { Notice, Panel } from "@/components/panel";

export default function AboutPage() {
  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 关于
      </div>

      <Notice>
        西祠堂巷不是任何旧站的官方重启。
        <br />
        本项目不复制旧站数据，不导入历史用户，不使用旧站 Logo 或商标资产。
        <br />
        它只是一个中文旧网复兴实验，想复原那个年代“人人都能开一个讨论版”的感觉。
      </Notice>

      <Panel title="项目缘起">
        <p>
          很多人怀念的不是某一个具体站点，而是旧中文论坛里那种低速、密集、能开版、能认门的社区组织方式。
          西祠堂巷先做一个样板间，让人能看版、看帖、申请开版、发帖回帖，再慢慢等人回来。
        </p>
      </Panel>

      <Panel title="内容治理说明">
        <p>
          试营业阶段会保留人工审核和基础治理：开巷申请由站长查看，版块后续由斑竹协助维护。禁止冒充官方、
          搬运旧站隐私资料、导入历史用户或使用旧站商标素材。
        </p>
      </Panel>

      <Panel title="联系方式占位">
        <p className="status-line">站长邮箱和公开沟通渠道会在正式试营业前补上。</p>
        <Link className="bbs-button" href="/apply">
          开巷申请入口
        </Link>
      </Panel>
    </main>
  );
}
