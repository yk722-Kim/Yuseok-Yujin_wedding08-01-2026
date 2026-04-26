import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/yukim-wedding-invitation/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/tokens.scss" as *;`
      }
    }
  }
});