create table if not exists sources(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rss_url text,
  homepage_url text,
  region text default 'WA',
  is_enabled boolean default true,
  created_at timestamptz default now()
);

create type status as enum ('fetched','selected','generated','published','error');

create table if not exists articles(
  id uuid primary key default gen_random_uuid(),
  source_id uuid references sources(id),
  original_url text,
  original_title text,
  raw_text text,
  published_at timestamptz,
  discovered_at timestamptz default now(),
  status status default 'fetched',
  created_at timestamptz default now()
);

create table if not exists stories(
  id uuid primary key default gen_random_uuid(),
  article_id uuid references articles(id),
  ai_title text not null,
  ai_subtitle text,
  ai_body_md text not null,
  image_url text,
  tags text[],
  region text default 'WA',
  category text,
  bottom_line text,
  slug text unique,
  created_at timestamptz default now(),
  published_at timestamptz
);

create index if not exists idx_stories_fts on stories using gin (to_tsvector('english', coalesce(ai_title,'') || ' ' || coalesce(ai_body_md,'')));
