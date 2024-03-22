import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: {
    headers: {
        "Access-Control-Allow-Origin": "https://nad-edu-git-urgencia-novo-nads-projects-178161a5.vercel.app/"
    }
  },
  adapter: vercel()
});