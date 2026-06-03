import type { BoardSummary, Category, ThreadDetail, ThreadSummary } from "@/lib/types";

const now = new Date("2026-06-03T09:00:00.000Z").toISOString();

export const fallbackCategories: Category[] = [
  { id: "cat-old-web", name: "旧网回忆", slug: "old-web", sort_order: 1 },
  { id: "cat-city", name: "城市巷子", slug: "city", sort_order: 2 },
  { id: "cat-life", name: "生活茶馆", slug: "life", sort_order: 3 },
  { id: "cat-interest", name: "兴趣小版", slug: "interest", sort_order: 4 },
  { id: "cat-site", name: "站务公告", slug: "site", sort_order: 5 }
];

export const fallbackBoards: BoardSummary[] = [
  {
    id: "board-laowangmin",
    name: "老网民报到处",
    slug: "laowangmin-baodao",
    description: "先进来喊一声，看看当年的马甲还在不在。",
    board_no: 1001,
    category: "旧网回忆",
    category_slug: "old-web",
    moderators: ["巷口值夜"],
    announcement: "报到不用格式，想起哪段旧网日子就写哪段。",
    created_at: now,
    thread_count: 24,
    reply_count: 118,
    favorite_count: 42,
    last_replied_at: now
  },
  {
    id: "board-tianya",
    name: "天涯重启观察",
    slug: "tianya-chongqi",
    description: "不冒充，不搬运，只聊中文老社区记忆为什么又被想起。",
    board_no: 1002,
    category: "旧网回忆",
    category_slug: "old-web",
    moderators: ["旧帖翻页"],
    announcement: "请勿导入旧站资料，也不要使用旧站商标素材。",
    created_at: now,
    thread_count: 18,
    reply_count: 73,
    favorite_count: 31,
    last_replied_at: now
  },
  {
    id: "board-nanjing",
    name: "南京旧网民",
    slug: "nanjing-jiuwangmin",
    description: "新街口、珠江路、鼓楼，给南京网友留一张旧木凳。",
    board_no: 2001,
    category: "城市巷子",
    category_slug: "city",
    moderators: ["金陵夜谈"],
    announcement: "城市记忆可以散聊，别做人肉和隐私曝光。",
    created_at: now,
    thread_count: 12,
    reply_count: 49,
    favorite_count: 20,
    last_replied_at: now
  },
  {
    id: "board-insomnia",
    name: "失眠的人都醒着",
    slug: "shimian-xingzhe",
    description: "半夜三点的水帖，天亮以后也算数。",
    board_no: 3003,
    category: "生活茶馆",
    category_slug: "life",
    moderators: ["夜里有灯"],
    announcement: "互相陪一下，不做诊断，不开药方。",
    created_at: now,
    thread_count: 15,
    reply_count: 66,
    favorite_count: 27,
    last_replied_at: now
  },
  {
    id: "board-bbs-slang",
    name: "BBS 黑话词典",
    slug: "bbs-heihua",
    description: "顶、沙发、潜水、挖坟，都先搁这儿。",
    board_no: 4004,
    category: "兴趣小版",
    category_slug: "interest",
    moderators: ["沙发没抢到"],
    announcement: "欢迎补词条，别把玩笑写成百科腔。",
    created_at: now,
    thread_count: 9,
    reply_count: 38,
    favorite_count: 16,
    last_replied_at: now
  }
];

export const fallbackThreads: ThreadSummary[] = [
  {
    id: "thread-baodao",
    board_id: "board-laowangmin",
    board_slug: "laowangmin-baodao",
    board_name: "老网民报到处",
    title: "报个到，看看还有多少老网民",
    content: "我先来。以前注册论坛还要等邮件验证，等了一晚上，第二天醒来第一件事就是去收信。",
    author_name: "巷口值夜",
    created_at: now,
    last_replied_at: now,
    view_count: 328,
    reply_count: 12,
    is_pinned: true,
    is_locked: false,
    is_featured: false
  },
  {
    id: "thread-mail",
    board_id: "board-laowangmin",
    board_slug: "laowangmin-baodao",
    board_name: "老网民报到处",
    title: "还有人记得注册论坛要等邮件验证吗",
    content: "那会儿等验证邮件像等录取通知书，邮箱刷新到手软。",
    author_name: "旧帖翻页",
    created_at: now,
    last_replied_at: now,
    view_count: 188,
    reply_count: 7,
    is_pinned: false,
    is_locked: false,
    is_featured: true
  },
  {
    id: "thread-tianya",
    board_id: "board-tianya",
    board_slug: "tianya-chongqi",
    board_name: "天涯重启观察",
    title: "天涯回来了，但我们真的还会回去吗",
    content: "想回去的可能不是某一个网站，是那种慢慢写、慢慢等回复的时间。",
    author_name: "旧帖翻页",
    created_at: now,
    last_replied_at: now,
    view_count: 266,
    reply_count: 10,
    is_pinned: false,
    is_locked: false,
    is_featured: false
  },
  {
    id: "thread-nanjing",
    board_id: "board-nanjing",
    board_slug: "nanjing-jiuwangmin",
    board_name: "南京旧网民",
    title: "新街口还在吗，我说的是以前那种还在吗",
    content: "地铁口越来越多，卖碟的小摊早没了。想听听大家记忆里的新街口。",
    author_name: "金陵夜谈",
    created_at: now,
    last_replied_at: now,
    view_count: 143,
    reply_count: 5,
    is_pinned: false,
    is_locked: false,
    is_featured: false
  },
  {
    id: "thread-sleep",
    board_id: "board-insomnia",
    board_slug: "shimian-xingzhe",
    board_name: "失眠的人都醒着",
    title: "开个版，收留一下睡不着的人",
    content: "不一定要讲大事，半夜能有人回个“我也醒着”就够了。",
    author_name: "夜里有灯",
    created_at: now,
    last_replied_at: now,
    view_count: 201,
    reply_count: 9,
    is_pinned: false,
    is_locked: false,
    is_featured: false
  }
];

export const fallbackThreadDetail: ThreadDetail = {
  thread: fallbackThreads[0] as ThreadSummary & { content: string },
  board: fallbackBoards[0],
  posts: [
    {
      id: "post-2",
      floor_no: 2,
      author_name: "沙发没抢到",
      content: "我记得，还记得验证邮件经常跑到垃圾箱。",
      created_at: now
    },
    {
      id: "post-3",
      floor_no: 3,
      author_name: "夜里有灯",
      content: "先占个楼。这个页面看着有点像回到网吧包夜。",
      created_at: now
    }
  ]
};
