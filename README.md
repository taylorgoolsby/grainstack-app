# Next.js + D1 (SQLite) + Drizzle + GraphQL Yoga on Cloudflare Workers

## One-time setup
1. `npm install`
2. `npx wrangler login`
3. `npx wrangler d1 create my-app-db` → paste the `database_id` into `wrangler.jsonc`
4. `npm run cf-typegen` (generates `cloudflare-env.d.ts`; commit it)
5. `npm run db:generate` (creates SQL in `./drizzle`; commit it)
6. `npm run db:migrate:local && npm run dev`

## Continuous deployment
Add these GitHub repo secrets (Settings → Secrets and variables → Actions):
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` (create from the "Edit Cloudflare Workers" template; add Account → D1 → Edit)

Every push to `main` applies pending migrations, then builds and deploys.

## Schema changes
Edit `src/db/schema.ts` → `npm run db:generate` → commit → push.

