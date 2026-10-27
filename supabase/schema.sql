-- Oloning'o Travel: database schema and security rules
-- Run this once in Supabase → SQL Editor, then run seed.sql.
-- Public visitors can only read published content. Only admins can write.
-- Inquiries are written by the website server (service role) and read by admins.

-- ---------- helpers ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Admin accounts: add a row here (with the user's auth id) to give someone admin access.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- content ----------
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_de text not null default '',
  region_en text not null default '',
  region_de text not null default '',
  description_en text not null default '',
  description_de text not null default '',
  best_time_en text not null default '',
  best_time_de text not null default '',
  keywords text not null default '',
  group_key text not null default 'safari' check (group_key in ('safari', 'lakes', 'coast')),
  latitude double precision,
  longitude double precision,
  image text,
  placeholder text not null default 'savannah',
  featured boolean not null default false,
  position int not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_de text not null default '',
  summary_en text not null default '',
  summary_de text not null default '',
  season_en text not null default '',
  season_de text not null default '',
  duration_days int not null check (duration_days > 0),
  price_from numeric(10, 2) not null check (price_from >= 0),
  style text not null check (style in ('safari', 'beach', 'combo')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  cover_image text,
  placeholder text not null default 'savannah',
  featured boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_destinations (
  trip_id uuid not null references public.trips (id) on delete cascade,
  destination_id uuid not null references public.destinations (id) on delete cascade,
  position int not null default 0,
  primary key (trip_id, destination_id)
);

create table if not exists public.trip_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  day_number int not null,
  day_label text not null default '', -- e.g. "2–3" for a multi-day stop
  title_en text not null,
  title_de text not null default '',
  description_en text not null default '',
  description_de text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_inclusions (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  type text not null check (type in ('included', 'excluded')),
  text_en text not null,
  text_de text not null default '',
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trip_images (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  url text not null,
  alt_en text not null default '',
  alt_de text not null default '',
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  label_en text not null,
  label_de text not null default '',
  starts_on date not null,
  ends_on date not null,
  price_override numeric(10, 2),
  percent_off numeric(5, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on >= starts_on),
  check ((price_override is not null) <> (percent_off is not null))
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  origin_en text not null default '',
  origin_de text not null default '',
  trip_id uuid references public.trips (id) on delete set null,
  text_en text not null default '',
  text_de text not null default '',
  rating smallint not null default 5 check (rating between 1 and 5),
  photo text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_de text not null default '',
  excerpt_en text not null default '',
  excerpt_de text not null default '',
  body_en text not null default '',
  body_de text not null default '',
  category_en text not null default '',
  category_de text not null default '',
  cover_image text,
  placeholder text not null default 'savannah',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  meta_title_en text not null default '',
  meta_title_de text not null default '',
  meta_description_en text not null default '',
  meta_description_de text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.post_trips (
  post_id uuid not null references public.posts (id) on delete cascade,
  trip_id uuid not null references public.trips (id) on delete cascade,
  primary key (post_id, trip_id)
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  is_welcome boolean not null default false,
  eyebrow_en text not null default '',
  eyebrow_de text not null default '',
  title_en text not null,
  title_de text not null default '',
  text_en text not null default '',
  text_de text not null default '',
  link_label_en text not null default '', -- welcome slide: the small trust line
  link_label_de text not null default '',
  destination_id uuid references public.destinations (id) on delete set null,
  image text,
  placeholder text not null default 'dawn',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_pages (
  slug text primary key check (slug in ('impressum', 'privacy', 'terms')),
  title_en text not null,
  title_de text not null default '',
  body_en text not null default '',
  body_de text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- inquiries ----------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  travelers int not null check (travelers >= 1),
  destination text not null default '',
  budget text not null default '',
  travel_period text not null default '',
  arrival_flight text not null default '',
  message text not null default '',
  trip_id uuid references public.trips (id) on delete set null,
  language text not null default 'en' check (language in ('en', 'de')),
  status text not null default 'new' check (status in ('new', 'in_progress', 'quoted', 'closed')),
  notes text not null default '',
  ip_hash text, -- anonymised, only used for spam rate limiting
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_ip_idx on public.inquiries (ip_hash, created_at desc);
create index if not exists trips_status_idx on public.trips (status, position);
create index if not exists posts_status_idx on public.posts (status, published_at desc);
create index if not exists reviews_status_idx on public.reviews (status, created_at desc);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['destinations','trips','trip_days','trip_inclusions','trip_images','offers',
    'reviews','posts','hero_slides','legal_pages','settings','inquiries']
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ---------- row-level security ----------
alter table public.admins enable row level security;
alter table public.destinations enable row level security;
alter table public.trips enable row level security;
alter table public.trip_destinations enable row level security;
alter table public.trip_days enable row level security;
alter table public.trip_inclusions enable row level security;
alter table public.trip_images enable row level security;
alter table public.offers enable row level security;
alter table public.reviews enable row level security;
alter table public.posts enable row level security;
alter table public.post_trips enable row level security;
alter table public.hero_slides enable row level security;
alter table public.legal_pages enable row level security;
alter table public.settings enable row level security;
alter table public.inquiries enable row level security;

-- Admins: full access everywhere
do $$
declare t text;
begin
  foreach t in array array['destinations','trips','trip_destinations','trip_days','trip_inclusions','trip_images',
    'offers','reviews','posts','post_trips','hero_slides','legal_pages','settings','inquiries']
  loop
    execute format('drop policy if exists "admin all" on public.%I', t);
    execute format('create policy "admin all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins for select to authenticated using (user_id = auth.uid());

-- Public: read published content only
drop policy if exists "public read" on public.destinations;
create policy "public read" on public.destinations for select using (status = 'published');

drop policy if exists "public read" on public.trips;
create policy "public read" on public.trips for select using (status = 'published');

drop policy if exists "public read" on public.trip_destinations;
create policy "public read" on public.trip_destinations for select
  using (exists (select 1 from public.trips t where t.id = trip_id and t.status = 'published'));

drop policy if exists "public read" on public.trip_days;
create policy "public read" on public.trip_days for select
  using (exists (select 1 from public.trips t where t.id = trip_id and t.status = 'published'));

drop policy if exists "public read" on public.trip_inclusions;
create policy "public read" on public.trip_inclusions for select
  using (exists (select 1 from public.trips t where t.id = trip_id and t.status = 'published'));

drop policy if exists "public read" on public.trip_images;
create policy "public read" on public.trip_images for select
  using (exists (select 1 from public.trips t where t.id = trip_id and t.status = 'published'));

drop policy if exists "public read" on public.offers;
create policy "public read" on public.offers for select
  using (exists (select 1 from public.trips t where t.id = trip_id and t.status = 'published'));

drop policy if exists "public read" on public.reviews;
create policy "public read" on public.reviews for select using (status = 'approved');

drop policy if exists "public read" on public.posts;
create policy "public read" on public.posts for select
  using (status = 'published' and published_at is not null and published_at <= now());

drop policy if exists "public read" on public.post_trips;
create policy "public read" on public.post_trips for select
  using (exists (select 1 from public.posts p where p.id = post_id and p.status = 'published'));

drop policy if exists "public read" on public.hero_slides;
create policy "public read" on public.hero_slides for select using (active);

drop policy if exists "public read" on public.legal_pages;
create policy "public read" on public.legal_pages for select using (true);

drop policy if exists "public read" on public.settings;
create policy "public read" on public.settings for select using (true);
-- inquiries: no public policy, so visitors can neither read nor write them directly.

-- ---------- image storage ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');

drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());
