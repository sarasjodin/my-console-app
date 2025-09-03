// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  build: {
    target: 'es2018',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'accessibility-statement': resolve(
          __dirname,
          'accessibility-statement.html'
        ),
        'integrity-policy': resolve(__dirname, 'integrity-policy.html')
      }
    }
  }
});
