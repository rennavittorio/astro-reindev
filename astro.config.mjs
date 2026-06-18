// @no-ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

// loadEnv reads .env files synchronously before Vite initializes
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false, // for static builds
    }),
  ],
  image: {
    domains: ["cdn.sanity.io"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
});
