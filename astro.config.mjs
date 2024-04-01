import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  adapter: node({
    mode: "standalone"
  })
});