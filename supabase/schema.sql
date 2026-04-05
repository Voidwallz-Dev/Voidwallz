-- Profiles table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc', now())
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Wallpapers table
create table wallpapers (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null,
  device text default 'all' check (device in ('pc', 'mobile', 'tablet', 'all')),
  resolution text not null,
  file_url text not null,
  thumbnail_url text not null,
  tags text[] default '{}',
  downloads integer default 0,
  featured boolean default false,
  uploaded_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- Increment downloads function
create or replace function increment_downloads(wallpaper_id uuid)
returns void as $$
begin
  update wallpapers set downloads = downloads + 1 where id = wallpaper_id;
end;
$$ language plpgsql security definer;

-- RLS Policies
alter table profiles enable row level security;
alter table wallpapers enable row level security;

-- Anyone can read wallpapers
create policy "Wallpapers are publicly readable"
  on wallpapers for select using (true);

-- Only admins can insert/update/delete wallpapers
create policy "Only admins can manage wallpapers"
  on wallpapers for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Users can read their own profile
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

-- Storage bucket (run separately in Supabase dashboard)
-- Create bucket named: wallpapers
-- Set to public