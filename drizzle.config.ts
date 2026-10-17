import { defineConfig } from "drizzle-kit";

// Used only to *generate* SQL migrations. They're applied by `wrangler d1 migrations apply`.
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
