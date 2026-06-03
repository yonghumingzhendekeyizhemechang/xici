# 西祠堂巷

西祠堂巷是一个向 2000 年代中文 BBS / 论坛文化致意的复古社区实验。它的第一目标不是做完整论坛，而是先搭出一个可以访问、可以截图传播、可以申请开版、可以发帖回帖的样板间。

## 非官方声明

西祠堂巷不是任何旧站的官方重启。

本项目不复制旧站数据，不导入历史用户，不使用旧站 Logo 或商标资产。它只是一个中文旧网复兴实验，想复原那个年代“人人都能开一个讨论版”的感觉。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- CSS Variables / Design Tokens
- Supabase Auth
- Supabase Postgres

## 本地启动方式

推荐使用 pnpm：

```bash
pnpm install
pnpm dev
```

然后访问：

```text
http://localhost:3000
```

如果使用 npm 或 yarn，也可以对应执行 `npm install && npm run dev` 或 `yarn && yarn dev`。

## 环境变量说明

复制 `.env.example` 到 `.env.local`，填写：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 会进入浏览器 bundle，必须配合 RLS 使用。`SUPABASE_SERVICE_ROLE_KEY` 只能放在服务端环境变量里，不要暴露到客户端、日志或公开仓库。

## Supabase 项目创建步骤

1. 在 Supabase 创建新项目。
2. 在 Project Settings 找到 API URL、anon key、service role key。
3. 把上述值写入 `.env.local`。
4. 在 Authentication 里保留 Email / Password 登录，不需要开启 Google、GitHub、手机号、微信或 QQ 登录。
5. 正式面向国内用户前，建议配置自定义 SMTP。

## Migration 执行方式

使用 Supabase CLI：

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

本阶段 migration 位于：

```text
supabase/migrations/20260603000000_phase_0_1_schema.sql
```

它创建 profiles、categories、boards、board_members、threads、posts、favorites、board_applications、moderation_logs、reports，并开启基础 RLS。

## Seed 执行方式

本阶段 seed 位于：

```text
supabase/seed.sql
```

可在本地 Supabase 或远端 SQL Editor 执行。seed 会创建 5 个分类、16 个初始版块、每版 3 条主题帖和 1-2 条回帖，并提供一个测试账号：

```text
email: seed@xicitangxiang.local
password: xici123456
username: seed_admin
```

## Vercel 部署步骤

1. 把仓库导入 Vercel。
2. 在 Vercel Project Settings 配置 `.env.example` 中的所有环境变量。
3. 确认 `SUPABASE_SERVICE_ROLE_KEY` 只配置为服务端环境变量。
4. 部署前先在 Supabase 执行 migration 和 seed。
5. 部署后检查 `/about` 和 `/revival` 的非官方声明。

## 当前已完成功能

- 巷口首页 `/`
- 讨论版列表 `/boards`
- 单个讨论版页 `/boards/[slug]`
- 帖子详情 `/threads/[id]`
- 开巷申请 `/apply`
- 登录 `/login`
- 注册 `/register`
- 关于 `/about`
- 传播页 `/revival`
- username 或 email 登录的服务端逻辑
- 发帖、回帖、预定 / 取消预定版块
- Supabase migration、基础 RLS 和 seed
- 未配置 Supabase 时的复古样板数据

## 下一阶段 TODO

- Phase 2 管理后台：审核开巷申请、创建版块、处理举报。
- 斑竹治理：置顶、锁定、隐藏帖子，编辑版块公告。
- 治理日志写入的后台操作界面。
- 更完整的种子内容和传播页文案。
