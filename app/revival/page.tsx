import Link from "next/link";
import { Notice, Panel } from "@/components/panel";

export default function RevivalPage() {
  return (
    <main className="stack">
      <div className="breadcrumb">
        <Link href="/">巷口首页</Link> &gt; 旧网复兴
      </div>

      <Panel title="天涯重启了，我想重新搭一个巷口">
        <p>
          天涯重启让很多中文老社区记忆又浮了上来。我们想做的不是冒充任何旧站，也不是复制过去的数据，
          而是重新试一次：普通人能不能开一个讨论版，慢慢等同好进来，靠帖子和回帖把一条巷子养出来。
        </p>
        <p>
          西祠堂巷不导入历史用户，不使用旧站 Logo 或商标资产。它只是一个中文旧网复兴实验，想复原
          那个年代“人人都能开一个讨论版”的感觉。
        </p>
      </Panel>

      <Notice>
        不是复制过去，而是把“可以开版、可以回帖、可以认门”的旧网感觉重新点亮。
      </Notice>

      <Panel title="开一条自己的巷子">
        <p className="status-line">
          如果你心里也有一个小版，可能是城市、兴趣、深夜茶馆，或者某种没人好好聊天的角落，可以先递申请。
        </p>
        <Link className="bbs-button" href="/apply">
          申请开一条自己的巷子
        </Link>
      </Panel>
    </main>
  );
}
