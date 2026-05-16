-- KHZ Boutique inventory database schema.
-- Run this in Supabase SQL Editor after creating a new Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.inventory_products (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  category text not null,
  price integer not null default 0,
  image_url text,
  specs jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.inventory_products(id) on delete cascade,
  code text not null unique,
  color text not null,
  stock integer not null default 0 check (stock >= 0),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, color)
);

create table if not exists public.inventory_stock_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.inventory_variants(id) on delete cascade,
  changed_by uuid references auth.users(id) on delete set null,
  change_type text not null check (change_type in ('set', 'add', 'subtract')),
  quantity integer not null,
  stock_before integer not null check (stock_before >= 0),
  stock_after integer not null check (stock_after >= 0),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists inventory_products_category_idx
  on public.inventory_products(category);

create index if not exists inventory_products_active_idx
  on public.inventory_products(is_active);

create index if not exists inventory_variants_product_idx
  on public.inventory_variants(product_id);

create index if not exists inventory_variants_active_idx
  on public.inventory_variants(is_active);

create index if not exists inventory_stock_movements_variant_idx
  on public.inventory_stock_movements(variant_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists inventory_products_set_updated_at on public.inventory_products;
create trigger inventory_products_set_updated_at
before update on public.inventory_products
for each row execute function public.set_updated_at();

drop trigger if exists inventory_variants_set_updated_at on public.inventory_variants;
create trigger inventory_variants_set_updated_at
before update on public.inventory_variants
for each row execute function public.set_updated_at();

alter table public.inventory_products enable row level security;
alter table public.inventory_variants enable row level security;
alter table public.inventory_stock_movements enable row level security;

create policy "Admins can read inventory products"
on public.inventory_products
for select
to authenticated
using (true);

create policy "Admins can manage inventory products"
on public.inventory_products
for all
to authenticated
using (true)
with check (true);

create policy "Admins can read inventory variants"
on public.inventory_variants
for select
to authenticated
using (true);

create policy "Admins can manage inventory variants"
on public.inventory_variants
for all
to authenticated
using (true)
with check (true);

create policy "Admins can read stock movements"
on public.inventory_stock_movements
for select
to authenticated
using (true);

create policy "Admins can add stock movements"
on public.inventory_stock_movements
for insert
to authenticated
with check (true);

create or replace view public.inventory_summary as
select
  p.id,
  p.code,
  p.name,
  p.category,
  p.price,
  p.image_url,
  p.specs,
  p.is_active,
  coalesce(sum(v.stock) filter (where v.is_active = true), 0)::integer as total_stock,
  count(v.id) filter (where v.is_active = true)::integer as variant_count,
  p.updated_at
from public.inventory_products p
left join public.inventory_variants v on v.product_id = p.id
group by p.id;

grant usage on schema public to anon, authenticated, service_role;

grant select on public.inventory_summary to authenticated, service_role;

grant select, insert, update, delete
on public.inventory_products
to authenticated, service_role;

grant select, insert, update, delete
on public.inventory_variants
to authenticated, service_role;

grant select, insert
on public.inventory_stock_movements
to authenticated, service_role;
