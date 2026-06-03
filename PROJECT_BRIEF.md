# 西祠堂巷 PROJECT_BRIEF

> 本文档用于放在 Codex 项目根目录，作为项目开发的长期上下文。  
> 建议文件名：`PROJECT_BRIEF.md`。  
> Codex 每次接手开发任务前，应先阅读本文档，不要重新发散产品方向。

---

## 1. 项目基本信息

### 1.1 项目名

**西祠堂巷**

### 1.2 项目定位

西祠堂巷是一个向 2000 年代中文 BBS / 论坛文化致意的复古社区实验。

它不是任何旧站的官方重启，不复制旧站数据，不使用旧站 Logo、商标、历史用户资料。它只复刻中文老论坛的视觉气质、信息密度和社区组织方式。

一句话定位：

> 西祠堂巷，一个中文旧网复兴实验。可以开版，可以回帖，可以认门，也可以慢慢等人回来。

### 1.3 非官方声明

项目所有公开页面，尤其是 `/about` 和 `/revival`，必须明确写出：

- 西祠堂巷不是任何旧站的官方重启。
- 本项目不复制旧站数据。
- 本项目不导入历史用户。
- 本项目不使用旧站 Logo 或商标资产。
- 本项目只是一个中文旧网复兴实验，想复原那个年代“人人都能开一个讨论版”的感觉。

---

## 2. 产品原则

### 2.1 核心不是“论坛”，而是“开一条自己的巷子”

西祠堂巷的产品核心不是单纯发帖回帖，而是让用户产生这样的冲动：

> 我也想开一个自己的讨论版。

因此第一优先级是：

- 看版
- 看帖
- 申请开版 / 开巷
- 发帖
- 回帖
- 预定版块 / 认门
- 斑竹基础治理

### 2.2 复古不是难用

PC 端要像 2005 年中文论坛，移动端要能正常阅读和点击。

要求：

- PC 端保留高密度、窄版、表格感、蓝色链接、浅灰边框、宋体感。
- 移动端不允许横向溢出。
- 移动端可以保留复古视觉，但布局必须可读、可点、可操作。
- 不追求现代精致感。
- 不做复杂动画。
- 不做过度拟物。

### 2.3 先做样板间，再做社区

第一阶段目标不是做完整论坛，而是做一个可以截图传播、可以访问、可以申请开版、可以发帖回帖的最小版本。

第一版验收重点：

- 首页有旧网味。
- 页面不空。
- 用户能理解这是一个复古中文社区实验。
- 用户知道可以申请开一条自己的巷子。

---

## 3. 开发方式要求

### 3.1 GitHub 工作流

代码必须放在 GitHub 仓库中开发。

建议仓库名：

```text
xicitangxiang
```

不要直接提交到 `main` 分支。

每个阶段新建独立分支，例如：

```bash
git checkout -b phase-0-1
```

完成后提交 Pull Request，不要直接合并。

PR 标题建议：

```text
Phase 0-1: Build classic BBS prototype with Supabase auth and core content
```

提交信息示例：

```text
init next app and classic theme
add mock classic bbs pages
add supabase schema and auth flow
implement board thread post features
```

### 3.2 Codex 执行要求

Codex 不要重新发散产品方向。

Codex 应严格按本文档阶段实现。

每次阶段完成后，必须输出：

1. 已完成内容
2. 修改文件列表
3. 数据库 migration 文件说明
4. 环境变量说明
5. 本地启动方式
6. Supabase 初始化步骤
7. Vercel 部署注意事项
8. 已知问题
9. 下一阶段建议

完成后回复格式：

```text
已完成：
- ...

修改文件：
- ...

数据库变更：
- ...

环境变量：
- ...

本地测试：
- ...

部署说明：
- ...

已知问题：
- ...

下一阶段建议：
- ...
```

不要只说“完成了”。

---

## 4. 技术栈

### 4.1 使用技术

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- CSS Variables / Design Tokens
- Supabase
- Supabase Auth
- Supabase Postgres

### 4.2 部署目标

- Vercel 部署 Next.js
- Supabase 托管数据库和认证
- GitHub 管理代码和版本

### 4.3 第一阶段不要引入

第一阶段不要引入：

- Meilisearch
- Typesense
- Redis
- 队列系统
- AI 审核
- AI 总结
- 复杂富文本编辑器
- 私信
- 用户关注
- 积分
- 勋章
- VIP
- 付费会员
- 实时聊天
- 手机号登录
- Google 登录
- GitHub 登录
- 微信登录
- QQ 登录
- 小程序
- App
- Web3
- NFT

---

## 5. 阶段计划总览

### Phase 0：复古视觉样板

目标：搭出一个“像 2005 年中文论坛入口”的网站样板。

重点：

- 页面结构
- 复古视觉
- 响应式
- mock 数据
- 页面互相跳转

### Phase 1：Supabase 数据库与核心功能

目标：接入 Supabase，实现真实数据和基础用户行为。

重点：

- 用户名式注册登录
- 版块
- 帖子
- 回帖
- 预定 / 认门
- 开巷申请

### Phase 2：基础后台与斑竹治理

目标：让站长和斑竹可以运营。

重点：

- 管理员审核开巷申请
- 管理员创建版块
- 斑竹置顶 / 锁定 / 隐藏帖子
- 举报与治理日志

### Phase 3：种子内容与传播页

目标：让网站不是空的，能被截图传播。

重点：

- 15-20 个种子版块
- 每个版块 3-5 个种子帖
- `/revival` 传播页
- 小红书 / 公众号可转发的项目叙事

### Phase 4：复古体验增强

目标：增强旧网味，但不影响可用性。

重点：

- 楼层号
- 只看楼主
- 精华帖
- 友情链接
- 巷口爬行榜
- BBCode 简化支持
- 访问过链接变紫

### Phase 5：后续扩展

真实用户和内容增长后再做。

可能方向：

- 搜索增强
- 图片存储独立化
- 审核增强
- 缓存与扩容
- 数据统计

---

# 6. Phase 0：复古视觉样板

## 6.1 目标

先搭出一个“像 2005 年中文论坛入口”的网站样板。

第一阶段验收重点不是功能复杂，而是：

- 首页截图有旧网味。
- PC 端像老论坛。
- 移动端能正常阅读。
- 页面之间可以跳转。
- 结构清楚，不空洞。

## 6.2 页面

请实现以下页面：

```text
/                 巷口首页
/boards           讨论版列表 / 巷口爬行榜
/boards/[slug]    单个讨论版页
/threads/[id]     帖子详情页
/apply            开巷申请页
/login            登录页
/register         注册页
/about            关于页
/revival          传播页
```

## 6.3 PC 端视觉要求

- 页面最大宽度：960px 或 1000px。
- 整体窄版居中。
- 复古高信息密度。
- 字体优先使用宋体风格：

```css
SimSun, "Songti SC", serif
```

- 默认字号：12px 或 13px。
- 链接使用经典蓝色。
- 已访问链接使用紫色。
- 背景使用浅灰或浅米色。
- 模块有表格感。
- 栏目标题使用浅灰色条。
- 边框使用浅灰。
- 顶部导航类似旧门户横栏。
- 保留面包屑。
- 保留“版号”“斑竹”“回应数”“人气”等老论坛字段。

## 6.4 移动端视觉要求

- 不允许横向滚动。
- 列表改为单列。
- 字号可以提升到 14px。
- 点击区域不能太小。
- 保留复古颜色和气质，但不要强行复刻桌面表格。
- 手机端必须可读、可点、可发帖。

## 6.5 主题系统

不要把颜色、字号、边框写死在组件中。

请使用 CSS variables。

第一版只实现 `xici-classic` 主题，但预留 `modern` 主题结构。

示例：

```css
:root[data-theme="xici-classic"] {
  --bg-page: #f6f6f6;
  --bg-panel: #ffffff;
  --bg-header: #e6e6e6;
  --border-soft: #cfcfcf;
  --text-main: #111111;
  --text-muted: #666666;
  --link: #0000cc;
  --link-visited: #551a8b;
  --font-body: SimSun, "Songti SC", serif;
  --font-ui: SimSun, "Songti SC", serif;
  --radius-panel: 0px;
}
```

后续可以预留：

```css
:root[data-theme="modern"] {
  /* reserved */
}
```

---

## 7. 页面规格

### 7.1 首页 `/`

页面名称：巷口首页

模块顺序：

1. 顶部站名栏
2. 横向导航
3. 站内公告
4. 最新话题
5. 最热话题
6. 热门讨论版
7. 分类入口
8. 开巷申请入口
9. 友情链接 / 站长手札

首页文案方向：

```text
西祠堂巷
一个中文旧网复兴实验

可以开版，可以回帖，可以认门，也可以慢慢等人回来。
```

空状态文案：

```text
巷子刚开，第一批老网民还在路上。
```

### 7.2 讨论版列表 `/boards`

页面名称：巷口爬行榜

模块：

- 分类筛选
- 热门讨论版
- 最新开张
- 最近有回复
- 开巷申请入口

版块字段：

- 版名
- 版号
- 简介
- 分类
- 斑竹
- 帖子数
- 回帖数
- 最后回复时间

### 7.3 讨论版页 `/boards/[slug]`

模块：

1. 面包屑
2. 版块头部
3. 版块公告
4. 斑竹列表
5. 预定 / 认门按钮
6. 发帖入口
7. 帖子列表
8. 分页

版块头部字段：

- 版名
- 版号
- 简介
- 分类
- 创建时间
- 帖子数
- 回帖数
- 预定人数
- 斑竹

帖子列表字段：

- 状态：置顶 / 锁定 / 精华
- 标题
- 作者
- 回应数
- 人气
- 最后回复时间

### 7.4 帖子详情 `/threads/[id]`

模块：

1. 面包屑
2. 主帖
3. 回帖列表
4. 回帖框
5. 返回版块

主帖字段：

- 标题
- 作者
- 所属版块
- 发布时间
- 浏览量
- 正文

回帖字段：

- 楼层号
- 作者
- 时间
- 内容

要求：

- 显示楼层号。
- 主帖可显示为 1 楼。
- 回帖按时间正序排列。
- 未登录用户看到登录提示。
- 登录用户可以回帖。
- 如果帖子被锁定，则不能回帖。

### 7.5 开巷申请 `/apply`

表单字段：

- 想开的巷子名称
- 简短介绍
- 为什么想开
- 准备聊什么
- 你准备怎么管理
- 联系方式，可选
- 是否愿意担任斑竹

提交后提示：

```text
开巷申请已经递到巷口。站长会人工查看，合适的巷子会先试营业。
```

### 7.6 登录页 `/login`

不要使用现代 SaaS 语气。

页面文案：

```text
欢迎回到巷口
```

字段：

- 巷口 ID 或邮箱
- 暗号

按钮：

```text
进巷
```

辅助链接：

```text
还没有 ID？现在注册一个。
```

登录逻辑：

- 用户可以输入 username 或 email。
- 如果输入内容包含 `@`，按 email 登录。
- 如果不包含 `@`，先在 `profiles` 表查询 username 对应的 email，再调用 Supabase email/password 登录。
- username 查询逻辑必须在 server action 或 route handler 中完成。
- 不要在客户端暴露 service role key。

### 7.7 注册页 `/register`

页面文案：

```text
注册一个巷口 ID
```

字段：

- username，必填
- password，必填
- confirm_password，必填
- email，必填，用于找回密码，不公开
- display_name，可选，默认等于 username

username 规则：

- 唯一
- 3-20 位
- 允许中文、英文、数字、下划线
- 不允许空格
- 不允许特殊符号
- 不允许冒充官方，如 admin、root、站长、西祠堂巷、系统

注册逻辑：

- 使用 Supabase Auth email/password 创建用户。
- 创建成功后，在 `profiles` 表创建对应资料。
- `display_name` 为空时默认等于 `username`。
- 注册后跳转到首页或登录页。
- 邮箱用于找回密码，不在前台公开。

说明：

Supabase Auth 原生支持 email/password 登录，本项目要做的是“前台用户名注册体验，底层 email/password 承接”。

### 7.8 关于页 `/about`

必须包含：

```text
西祠堂巷不是任何旧站的官方重启。
本项目不复制旧站数据，不导入历史用户，不使用旧站 Logo 或商标资产。
它只是一个中文旧网复兴实验，想复原那个年代“人人都能开一个讨论版”的感觉。
```

还要包含：

- 项目缘起
- 内容治理说明
- 联系方式占位
- 开巷申请入口

### 7.9 传播页 `/revival`

标题：

```text
天涯重启了，我想重新搭一个巷口
```

内容方向：

- 天涯重启带来了中文老社区记忆回潮。
- 我们想做一个不冒充任何旧站的复古社区实验。
- 不是复制过去，而是复原“普通人可以开一个讨论版”的感觉。
- 邀请用户申请开巷。

页面底部按钮：

```text
申请开一条自己的巷子
```

---

# 8. Phase 1：Supabase 数据库与核心功能

## 8.1 Supabase Auth 原则

第一版不要接入：

- Google OAuth
- GitHub OAuth
- 微信登录
- QQ 登录
- 手机号登录

原因：

- Google / Gmail 对国内用户不友好。
- GitHub 只适合程序员群体。
- 微信 / QQ 接入成本和审核复杂度较高。
- 手机号登录成本高，也不符合老论坛马甲文化。

第一版采用：

```text
用户名 + 密码 + 邮箱
```

底层使用：

```text
Supabase Auth email/password
```

如果后续正式面向国内用户，建议配置自定义 SMTP，不长期依赖默认邮件服务。

## 8.2 环境变量

需要：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

要求：

- `NEXT_PUBLIC_SUPABASE_URL` 可以暴露到客户端。
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 可以暴露到客户端，但仍要配合 RLS。
- `SUPABASE_SERVICE_ROLE_KEY` 只能在服务端使用。
- 不得在客户端组件、浏览器 bundle、公开日志中暴露 service role key。

---

## 9. 数据库表

请创建 Supabase migration。

### 9.1 profiles

用户公开资料。

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  role text not null default 'user',
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

role 可选：

- user
- moderator
- admin

约束：

- username 唯一。
- username 不公开显示邮箱。
- display_name 默认为 username。

### 9.2 categories

分类。

```sql
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
```

初始分类：

- 旧网回忆
- 城市巷子
- 生活茶馆
- 兴趣小版
- 站务公告

### 9.3 boards

讨论版 / 巷子。

```sql
create table boards (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  name text not null,
  slug text unique not null,
  description text not null,
  board_no int unique not null,
  status text not null default 'active',
  visibility text not null default 'public',
  owner_id uuid references profiles(id),
  announcement text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

status 可选：

- pending
- active
- hidden
- archived

visibility 可选：

- public
- private

### 9.4 board_members

版块成员和斑竹。

```sql
create table board_members (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references boards(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique(board_id, user_id)
);
```

role 可选：

- owner
- moderator
- member

### 9.5 threads

主题帖。

```sql
create table threads (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references boards(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  content text not null,
  status text not null default 'published',
  is_pinned boolean not null default false,
  is_locked boolean not null default false,
  is_featured boolean not null default false,
  view_count int not null default 0,
  reply_count int not null default 0,
  last_replied_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

status 可选：

- draft
- published
- hidden
- deleted

### 9.6 posts

回帖。

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references threads(id) on delete cascade,
  board_id uuid not null references boards(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  status text not null default 'published',
  floor_no int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

说明：

- 主帖本身在 `threads` 表中。
- UI 上把 thread 渲染为 1 楼。
- posts 从 2 楼开始。

### 9.7 favorites

预定 / 认门。

```sql
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  board_id uuid not null references boards(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, board_id)
);
```

### 9.8 board_applications

开巷申请。

```sql
create table board_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references profiles(id) on delete set null,
  applicant_name text not null,
  contact text,
  board_name text not null,
  board_slug text,
  reason text not null,
  plan text,
  wants_to_moderate boolean not null default true,
  status text not null default 'pending',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

status 可选：

- pending
- approved
- rejected

### 9.9 moderation_logs

治理日志。

```sql
create table moderation_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) on delete set null,
  target_type text not null,
  target_id uuid not null,
  action text not null,
  reason text,
  created_at timestamptz not null default now()
);
```

### 9.10 reports

举报。

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id) on delete set null,
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
```

---

## 10. 索引

请至少创建：

```sql
create index idx_boards_category_id on boards(category_id);
create index idx_boards_slug on boards(slug);
create index idx_threads_board_id_created_at on threads(board_id, created_at desc);
create index idx_threads_board_id_last_replied_at on threads(board_id, last_replied_at desc);
create index idx_posts_thread_id_floor_no on posts(thread_id, floor_no);
create index idx_favorites_user_id on favorites(user_id);
create index idx_board_applications_status on board_applications(status);
create index idx_profiles_username on profiles(username);
```

---

## 11. RLS 权限

所有业务表开启 Row Level Security。

### 11.1 公开读取

游客可以读取：

- active + public 的 boards
- categories
- published threads
- published posts
- profiles 的公开字段

### 11.2 登录用户

登录用户可以：

- 创建 threads
- 创建 posts
- 创建 favorites
- 删除自己的 favorites
- 创建 board_applications
- 编辑自己的 profile
- 编辑自己的帖子，但如果帖子被锁定则不能编辑

### 11.3 斑竹

版主可以：

- 隐藏本版帖子
- 置顶本版帖子
- 锁定本版帖子
- 修改本版 announcement
- 所有操作写入 moderation_logs

### 11.4 管理员

管理员可以：

- 管理全站 boards
- 管理 applications
- 管理 threads/posts
- 管理 reports
- 设置 board_members
- 查看 moderation_logs

说明：

- 如果 RLS 一次性实现复杂，可以先实现安全的基础 RLS。
- 管理员操作可以先走 server side service role。
- service role 绝不能出现在客户端。

---

## 12. 核心功能

### 12.1 注册

路径：

```text
/register
```

功能：

- 输入 username、email、password、confirm_password、display_name。
- 校验 username 是否符合规则。
- 校验 email 是否唯一。
- 创建 Supabase auth user。
- 创建 profiles 记录。
- 注册成功后跳转登录或首页。

### 12.2 登录

路径：

```text
/login
```

功能：

- 输入 identifier 和 password。
- identifier 可以是 username 或 email。
- 如果包含 `@`，按 email 登录。
- 如果不包含 `@`，server side 查询 profiles.username 对应用户 email，再用 email/password 登录。
- 登录成功后跳转首页。

### 12.3 退出登录

提供退出按钮。

### 12.4 浏览首页

首页读取：

- 最新话题
- 最热话题
- 热门讨论版
- 分类
- 站内公告

### 12.5 浏览讨论版

讨论版页读取：

- 版块信息
- 版块公告
- 斑竹
- 帖子列表

### 12.6 发帖

登录用户可以在版块页发帖。

字段：

- title
- content

成功后跳转帖子详情页。

### 12.7 回帖

登录用户可以在帖子详情页回帖。

如果帖子被锁定，不显示回帖框。

回帖成功后更新：

- posts
- threads.reply_count
- threads.last_replied_at

### 12.8 预定 / 认门

登录用户可以预定一个版块。

再次点击可以取消预定。

### 12.9 开巷申请

游客或登录用户都可以提交。

如果已登录，记录 applicant_id。

未登录用户必须填写 applicant_name。

### 12.10 关于页和传播页

必须实现，且文案要清楚声明非官方属性。

---

## 13. 种子数据

请提供 seed 文件。

### 13.1 初始分类

```text
旧网回忆
城市巷子
生活茶馆
兴趣小版
站务公告
```

### 13.2 初始版块

```text
老网民报到处
天涯重启观察
西祠记忆考古
中文旧网档案馆
神帖考古队
南京旧网民
江苏茶水间
新街口还在吗
人到中年
离职前夜
失眠的人都醒着
县城生活观察
老游戏厅
无用知识研究所
BBS 黑话词典
站务公告
```

### 13.3 种子内容要求

每个版块至少创建：

- 1 条公告
- 3 条主题帖
- 每条主题帖 1-2 条回帖

内容语气要求：

- 像老网民随手发帖。
- 不要像 AI 生成。
- 不要像官方公告。
- 标题短一点、口语一点。

示例标题：

```text
还有人记得注册论坛要等邮件验证吗
天涯回来了，但我们真的还会回去吗
当年你混过哪个版
报个到，看看还有多少老网民
以前的论坛为什么比现在的小组好逛
开个版，收留一下睡不着的人
```

---

## 14. README 要求

请写 README，包含：

1. 项目介绍
2. 非官方声明
3. 技术栈
4. 本地启动方式
5. 环境变量说明
6. Supabase 项目创建步骤
7. migration 执行方式
8. seed 执行方式
9. Vercel 部署步骤
10. 当前已完成功能
11. 下一阶段 TODO

本地开发命令示例：

```bash
pnpm install
pnpm dev
```

如果使用 npm 或 yarn，也请明确说明。

---

## 15. 第一版完成标准

完成后必须满足：

- 首页可访问。
- 讨论版列表可访问。
- 单个讨论版页可访问。
- 帖子详情页可访问。
- 用户可以注册。
- 用户可以用 username 或 email 登录。
- 用户可以退出登录。
- 登录用户可以发帖。
- 登录用户可以回帖。
- 登录用户可以预定 / 取消预定版块。
- 用户可以提交开巷申请。
- 关于页有非官方声明。
- 传播页有项目缘起和开巷入口。
- PC 端有复古 BBS 视觉气质。
- 移动端可读可点。
- 不依赖 Google / GitHub OAuth。
- 不暴露 Supabase service role key。
- 提供 migration 和 seed 文件。
- 提供 README。

---

## 16. 本阶段不要做的事

本阶段不要做：

- 私信
- 用户关注
- 积分
- 勋章
- VIP
- 付费会员
- 实时聊天
- 手机号登录
- Google 登录
- GitHub 登录
- 微信登录
- QQ 登录
- AI 审核
- AI 总结
- 复杂搜索
- 小程序
- App
- Web3
- NFT
- 导入任何旧站数据
- 使用任何旧站 Logo 或商标素材

---

## 17. 后续阶段备忘

### Phase 2：基础后台与斑竹治理

后续再做：

- `/admin`
- `/admin/boards`
- `/admin/applications`
- `/admin/threads`
- `/admin/reports`
- `/admin/users`

管理员能力：

- 审核开巷申请
- 创建版块
- 隐藏版块
- 设置版块分类
- 设置版主
- 隐藏帖子
- 锁定帖子
- 置顶帖子
- 处理举报
- 查看管理日志

斑竹能力：

- 置顶帖子
- 锁定帖子
- 隐藏帖子
- 编辑版块公告
- 编辑版块简介

### Phase 3：传播与内容冷启动

后续再做：

- 更完整的种子内容
- 站长手札
- 旧网黑话词典
- 小红书 / 公众号传播文案
- 用户开巷征集

### Phase 4：复古体验增强

后续再做：

- 只看楼主
- 精华帖
- 友情链接
- 今日新帖
- 今日热议
- 最近经过的人
- 简单 BBCode
- 访问过链接变紫

### Phase 5：扩容与技术增强

真实增长后再考虑：

- Postgres 搜索优化
- Meilisearch / Typesense
- Cloudflare R2 / S3 图片存储
- 敏感词
- 链接风控
- 注册限频
- 发帖限频
- 缓存
- ISR
- 数据统计

---

## 18. 给 Codex 的最终提醒

请优先保证核心链路：

```text
浏览首页 → 进入讨论版 → 看帖子 → 注册 / 登录 → 发帖 → 回帖 → 预定版块 → 申请开巷
```

如果范围过大，请优先保证：

- 首页
- 讨论版列表
- 讨论版页
- 帖子详情
- 注册登录
- 发帖回帖
- 开巷申请

不要为了高级功能牺牲核心链路。

