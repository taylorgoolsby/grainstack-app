import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {};
export default nextConfig;

// Makes D1 bindings available in `next dev` (uses local SQLite via miniflare)
initOpenNextCloudflareForDev();
