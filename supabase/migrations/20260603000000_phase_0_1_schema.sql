create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  role text not null default 'user',
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('user', 'moderator', 'admin')),
  constraint profiles_username_check check (username ~ '^[A-Za-z0-9_一-龥]{3,20}$')
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.boards (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id),
  name text not null,
  slug text unique not null,
  description text not null,
  board_no int unique not null,
  status text not null default 'active',
  visibility text not null default 'public',
  owner_id uuid references public.profiles(id),
  announcement text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint boards_status_check check (status in ('pending', 'active', 'hidden', 'archived')),
  constraint boards_visibility_check check (visibility in ('public', 'private'))
);

create table public.board_members (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique(board_id, user_id),
  constraint board_members_role_check check (role in ('owner', 'moderator', 'member'))
);

create table public.threads (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
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
  updated_at timestamptz not null default now(),
  constraint threads_status_check check (status in ('draft', 'published', 'hidden', 'deleted'))
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  board_id uuid not null references public.boards(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  status text not null default 'published',
  floor_no int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(thread_id, floor_no),
  constraint posts_status_check check (status in ('published', 'hidden', 'deleted')),
  constraint posts_floor_no_check check (floor_no >= 2)
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  board_id uuid not null references public.boards(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, board_id)
);

create table public.board_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references public.profiles(id) on delete set null,
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
  updated_at timestamptz not null default now(),
  constraint board_applications_status_check check (status in ('pending', 'approved', 'rejected'))
);

create table public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  target_type text not null,
  target_id uuid not null,
  action text not null,
  reason text,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint reports_status_check check (status in ('pending', 'reviewing', 'resolved', 'rejected'))
);

create index idx_boards_category_id on public.boards(category_id);
create index idx_boards_slug on public.boards(slug);
create index idx_threads_board_id_created_at on public.threads(board_id, created_at desc);
create index idx_threads_board_id_last_replied_at on public.threads(board_id, last_replied_at desc);
create index idx_posts_thread_id_floor_no on public.posts(thread_id, floor_no);
create index idx_favorites_user_id on public.favorites(user_id);
create index idx_board_applications_status on public.board_applications(status);
create index idx_profiles_username on public.profiles(username);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger boards_set_updated_at
before update on public.boards
for each row execute function public.set_updated_at();

create trigger threads_set_updated_at
before update on public.threads
for each row execute function public.set_updated_at();

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger board_applications_set_updated_at
before update on public.board_applications
for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'anon');
$$;

create or replace function public.is_board_moderator(board_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.board_members
    where board_id = board_uuid
      and user_id = auth.uid()
      and role in ('owner', 'moderator')
  ) or public.current_user_role() = 'admin';
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.boards enable row level security;
alter table public.board_members enable row level security;
alter table public.threads enable row level security;
alter table public.posts enable row level security;
alter table public.favorites enable row level security;
alter table public.board_applications enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.reports enable row level security;

create policy "public can read profiles"
on public.profiles for select
using (true);

create policy "users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

create policy "public can read categories"
on public.categories for select
using (true);

create policy "public can read active boards"
on public.boards for select
using (status = 'active' and visibility = 'public');

create policy "admins can manage boards"
on public.boards for all
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "moderators can update own board"
on public.boards for update
using (public.is_board_moderator(id))
with check (public.is_board_moderator(id));

create policy "public can read board members"
on public.board_members for select
using (true);

create policy "admins can manage board members"
on public.board_members for all
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "public can read published threads"
on public.threads for select
using (status = 'published');

create policy "authenticated users can create threads"
on public.threads for insert
with check (
  auth.uid() = author_id
  and exists (
    select 1 from public.boards
    where boards.id = board_id
      and boards.status = 'active'
      and boards.visibility = 'public'
  )
);

create policy "authors can update unlocked threads"
on public.threads for update
using (author_id = auth.uid() and is_locked = false)
with check (author_id = auth.uid());

create policy "moderators can manage board threads"
on public.threads for update
using (public.is_board_moderator(board_id))
with check (public.is_board_moderator(board_id));

create policy "public can read published posts"
on public.posts for select
using (status = 'published');

create policy "authenticated users can create posts"
on public.posts for insert
with check (
  auth.uid() = author_id
  and exists (
    select 1 from public.threads
    where threads.id = thread_id
      and threads.board_id = posts.board_id
      and threads.status = 'published'
      and threads.is_locked = false
  )
);

create policy "authors can update own unlocked posts"
on public.posts for update
using (
  author_id = auth.uid()
  and exists (
    select 1 from public.threads
    where threads.id = thread_id
      and threads.is_locked = false
  )
)
with check (author_id = auth.uid());

create policy "moderators can manage board posts"
on public.posts for update
using (public.is_board_moderator(board_id))
with check (public.is_board_moderator(board_id));

create policy "public can read favorites"
on public.favorites for select
using (true);

create policy "users can create own favorites"
on public.favorites for insert
with check (auth.uid() = user_id);

create policy "users can delete own favorites"
on public.favorites for delete
using (auth.uid() = user_id);

create policy "anyone can create board applications"
on public.board_applications for insert
with check (applicant_id is null or applicant_id = auth.uid());

create policy "admins can read board applications"
on public.board_applications for select
using (public.current_user_role() = 'admin');

create policy "admins can update board applications"
on public.board_applications for update
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "admins can read moderation logs"
on public.moderation_logs for select
using (public.current_user_role() = 'admin');

create policy "moderators can create moderation logs"
on public.moderation_logs for insert
with check (actor_id = auth.uid() or public.current_user_role() = 'admin');

create policy "users can create reports"
on public.reports for insert
with check (reporter_id is null or reporter_id = auth.uid());

create policy "admins can manage reports"
on public.reports for all
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');
