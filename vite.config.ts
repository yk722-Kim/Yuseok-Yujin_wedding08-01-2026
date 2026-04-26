import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/Yuseok-Yujin_wedding08-01-2026/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/tokens.scss" as *;`
      }
    }
  }
});