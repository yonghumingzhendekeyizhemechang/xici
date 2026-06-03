insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'seed@xicitangxiang.local',
  crypt('xici123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false
)
on conflict (id) do nothing;

insert into auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
values (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'seed@xicitangxiang.local',
  '{"sub":"11111111-1111-1111-1111-111111111111","email":"seed@xicitangxiang.local"}',
  'email',
  now(),
  now(),
  now()
)
on conflict (provider, provider_id) do nothing;

insert into public.profiles (id, username, display_name, role, email_verified)
values ('11111111-1111-1111-1111-111111111111', 'seed_admin', '巷口值夜', 'admin', true)
on conflict (id) do update
set username = excluded.username,
    display_name = excluded.display_name,
    role = excluded.role,
    email_verified = excluded.email_verified;

insert into public.categories (name, slug, description, sort_order)
values
  ('旧网回忆', 'old-web', '旧论坛、旧社区、旧网民的公共抽屉。', 10),
  ('城市巷子', 'city', '城市里的旧人旧事和今日街口。', 20),
  ('生活茶馆', 'life', '睡不着、想聊天、随手记一笔。', 30),
  ('兴趣小版', 'interest', '不大的兴趣，也能开一个版。', 40),
  ('站务公告', 'site', '试营业、规则、维护和巷口手札。', 50)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    sort_order = excluded.sort_order;

with board_rows(name, slug, description, board_no, category_slug, announcement) as (
  values
    ('老网民报到处', 'laowangmin-baodao', '先进来喊一声，看看当年的马甲还在不在。', 1001, 'old-web', '报到不用格式，想起哪段旧网日子就写哪段。'),
    ('天涯重启观察', 'tianya-chongqi', '不冒充，不搬运，只聊中文老社区记忆为什么又被想起。', 1002, 'old-web', '请勿导入旧站资料，也不要使用旧站商标素材。'),
    ('西祠记忆考古', 'xici-jiyi-kaogu', '聊旧网气质，不复刻旧站身份。', 1003, 'old-web', '考古可以，别搬隐私，别认领历史用户。'),
    ('中文旧网档案馆', 'zhongwen-jiuwang-dangan', '收一些公开记忆和旧网词语。', 1004, 'old-web', '只收公开讨论，不收个人资料。'),
    ('神帖考古队', 'shentie-kaogu', '那些年大家口口相传的长帖和楼。', 1005, 'old-web', '讲记忆，不贴侵权全文。'),
    ('南京旧网民', 'nanjing-jiuwangmin', '新街口、珠江路、鼓楼，给南京网友留一张旧木凳。', 2001, 'city', '城市记忆可以散聊，别做人肉和隐私曝光。'),
    ('江苏茶水间', 'jiangsu-chashuijian', '江苏各地网友随手倒杯茶。', 2002, 'city', '本版主打闲聊，地域玩笑别过线。'),
    ('新街口还在吗', 'xinjiekou-haizaima', '问的是街口，也问的是以前那种热闹。', 2003, 'city', '欢迎老照片式回忆，但不要上传侵权图。'),
    ('人到中年', 'rendao-zhongnian', '不上价值，就聊过日子。', 3001, 'life', '少一点说教，多一点实话。'),
    ('离职前夜', 'lizhi-qianye', '辞职、裸辞、换行之前的夜谈。', 3002, 'life', '不提供法律意见，先把话说出来。'),
    ('失眠的人都醒着', 'shimian-xingzhe', '半夜三点的水帖，天亮以后也算数。', 3003, 'life', '互相陪一下，不做诊断，不开药方。'),
    ('县城生活观察', 'xiancheng-shenghuo', '小城里不太上热搜的日子。', 3004, 'life', '写身边事，注意隐私。'),
    ('老游戏厅', 'lao-youxiting', '街机、红白机、盗版盘和攻略本。', 4001, 'interest', '可以怀旧，不做下载资源站。'),
    ('无用知识研究所', 'wuyong-zhishi', '没什么用，但知道了挺高兴。', 4002, 'interest', '冷知识可以短，别装论文。'),
    ('BBS 黑话词典', 'bbs-heihua', '顶、沙发、潜水、挖坟，都先搁这儿。', 4003, 'interest', '欢迎补词条，别把玩笑写成百科腔。'),
    ('站务公告', 'zhanwu-gonggao', '巷口试营业、维护和规则。', 5001, 'site', '这里发站务，不灌水。')
)
insert into public.boards (name, slug, description, board_no, category_id, owner_id, announcement)
select board_rows.name,
       board_rows.slug,
       board_rows.description,
       board_rows.board_no,
       categories.id,
       '11111111-1111-1111-1111-111111111111',
       board_rows.announcement
from board_rows
join public.categories on categories.slug = board_rows.category_slug
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    board_no = excluded.board_no,
    category_id = excluded.category_id,
    owner_id = excluded.owner_id,
    announcement = excluded.announcement,
    updated_at = now();

insert into public.board_members (board_id, user_id, role)
select id, '11111111-1111-1111-1111-111111111111', 'owner'
from public.boards
on conflict (board_id, user_id) do update
set role = excluded.role;

delete from public.posts
where author_id = '11111111-1111-1111-1111-111111111111';

delete from public.threads
where author_id = '11111111-1111-1111-1111-111111111111';

do $$
declare
  board_record record;
  thread_id uuid;
  titles text[] := array[
    '报个到，看看还有多少老网民',
    '以前的论坛为什么比现在的小组好逛',
    '还有人记得注册论坛要等邮件验证吗',
    '当年你混过哪个版',
    '开个版，收留一下睡不着的人',
    '这个标题先短一点',
    '今天路过，留个脚印',
    '天涯回来了，但我们真的还会回去吗'
  ];
  bodies text[] := array[
    '先开一帖。别太正式，像以前那样随手写两句也行。',
    '我怀念的是慢慢等回复的时间，不是红点一直追着人跑。',
    '那时候发帖像往巷口贴纸条，第二天回来看看有没有人接话。',
    '先占个楼，等晚点有人来再慢慢聊。',
    '这个版要是能养起来，应该会挺有意思。'
  ];
  i int;
begin
  for board_record in select id, name, slug from public.boards loop
    for i in 1..3 loop
      thread_id := gen_random_uuid();
      insert into public.threads (
        id,
        board_id,
        author_id,
        title,
        content,
        is_pinned,
        is_featured,
        view_count,
        reply_count,
        last_replied_at
      )
      values (
        thread_id,
        board_record.id,
        '11111111-1111-1111-1111-111111111111',
        titles[((i + length(board_record.slug)) % array_length(titles, 1)) + 1],
        bodies[((i + length(board_record.name)) % array_length(bodies, 1)) + 1],
        i = 1,
        i = 2,
        80 + i * 17 + length(board_record.name),
        case when i = 1 then 2 else 1 end,
        now() - ((i || ' hours')::interval)
      );

      insert into public.posts (thread_id, board_id, author_id, content, floor_no)
      values (
        thread_id,
        board_record.id,
        '11111111-1111-1111-1111-111111111111',
        '我也记得。先回一楼，别让帖子空着。',
        2
      );

      if i = 1 then
        insert into public.posts (thread_id, board_id, author_id, content, floor_no)
        values (
          thread_id,
          board_record.id,
          '11111111-1111-1111-1111-111111111111',
          '这个版名可以，像以前会收藏的那种小版。',
          3
        );
      end if;
    end loop;
  end loop;
end $$;
