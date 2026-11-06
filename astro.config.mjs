import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Static site with one server route (/api/contact). Swap the adapter if you don't deploy to Vercel.
export default defineConfig({
  site: "https://dhiya.ai",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: "never",
});
