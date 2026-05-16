-- Run once before using "Nonaktifkan warna" in /gudang.

alter table public.inventory_variants
add column if not exists is_active boolean not null default true;

create index if not exists inventory_variants_active_idx
on public.inventory_variants(is_active);

drop view if exists public.inventory_summary;

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

grant select on public.inventory_summary to authenticated, service_role;
