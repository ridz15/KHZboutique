-- Run this once if Supabase REST API returns permission denied for inventory tables.

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
