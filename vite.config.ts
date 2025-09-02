// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  build: {
    target: 'es2018',
    minify: 'esbuild'
  }
});
