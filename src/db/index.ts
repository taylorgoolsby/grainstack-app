import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

// Call per request: bindings only exist inside a request context on Workers.
export const getDb = () => drizzle(getCloudflareContext().env.DB, { schema });
export type Db = ReturnType<typeof getDb>;
