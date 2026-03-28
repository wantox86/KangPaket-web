import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
export default defineConfig({
  site: 'https://wantox86.github.io',
  base: '/KangPaket-web',
  integrations: [tailwind()],
  output: 'static',
});
