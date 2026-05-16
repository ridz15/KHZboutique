# Supabase setup for KHZ Boutique inventory

This folder stores the database setup for the internal inventory feature.

## Step 1: Create project

Create a new Supabase project, for example:

```text
khz-boutique-inventory
```

Recommended region: Singapore or another region close to Indonesia.

## Step 2: Run schema

Open Supabase Dashboard -> SQL Editor -> New query, paste the content of:

```text
supabase/schema.sql
```

Then run it.

## Step 3: Copy project credentials

From Supabase Dashboard -> Project Settings -> API, copy:

```text
Project URL
anon public key
```

These will be used in the Next.js app later as:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not paste service role keys into public frontend code.

## Step 4: Import local Gudang data

Create a local-only `.env.local` file with:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
INVENTORY_ADMIN_PIN=
```

Then run:

```bash
npm run inventory:import
```

`SUPABASE_SERVICE_ROLE_KEY` is only for local import/admin scripts. Never expose
it in frontend code, screenshots, or public GitHub commits.

`INVENTORY_ADMIN_PIN` is required before stock can be edited from `/gudang`.

## Notes

The current `Gudang` folder remains local and ignored by Git. It will be used
as the initial import source, then Supabase will become the online source of
truth for stock.
