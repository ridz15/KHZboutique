-- Run once before uploading inventory product photos.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'inventory-photos',
  'inventory-photos',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view inventory photos" on storage.objects;
create policy "Public can view inventory photos"
on storage.objects
for select
to public
using (bucket_id = 'inventory-photos');

drop policy if exists "Admins can upload inventory photos" on storage.objects;
create policy "Admins can upload inventory photos"
on storage.objects
for insert
to authenticated, service_role
with check (bucket_id = 'inventory-photos');

drop policy if exists "Admins can update inventory photos" on storage.objects;
create policy "Admins can update inventory photos"
on storage.objects
for update
to authenticated, service_role
using (bucket_id = 'inventory-photos')
with check (bucket_id = 'inventory-photos');
