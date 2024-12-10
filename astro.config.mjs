// @ts-check
import path from "node:path";
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx()],
   vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    }
   }
});
