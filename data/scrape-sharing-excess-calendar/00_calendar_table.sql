create table if not exists public.calendar_events (
  id           bigint        generated always as identity primary key,
  uid          text          not null unique,          -- gcal UID for upsert 
  summary      text          not null,
  start_at     timestamptz   not null,                 
  end_at       timestamptz,
  description  text,
  location     text,
  all_day      boolean       not null default false,
  updated_at   timestamptz   not null default now()
);

-- index
create index if not exists idx_calendar_events_start_at
  on public.calendar_events (start_at);

-- public read access
create policy "Public read access"
  on public.calendar_events
  for select
  using (true);
