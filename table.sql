-- Create the table for latest videos
create table if not exists latest_videos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  channel_id text not null unique,
  channel_name text -- Optional: to keep track of whose ID it is
);

-- Enable Row Level Security (RLS)
alter table latest_videos enable row level security;

-- Create a policy to allow public (anon) access to read the table
-- Check if policy exists first to avoid errors on re-run
do $$
begin
  if not exists (
    select 1 from pg_policies 
    where tablename = 'latest_videos' 
    and policyname = 'Allow public read access'
  ) then
    create policy "Allow public read access"
    on latest_videos for select
    to anon
    using (true);
  end if;
end $$;

-- Optional: Insert a test channel (e.g., PaperZealot)
insert into latest_videos (channel_id, channel_name)
values ('UC17QRjzQlQc-VPxr7Ry-RLA', 'PaperZealot')
on conflict (channel_id) do nothing;
