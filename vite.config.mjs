// vite.config.mjs
import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        program: resolve(__dirname, 'program/index.html'),
        accessibility: resolve(__dirname, 'accessibility-statement.html'),
        integrity: resolve(__dirname, 'integrity-policy.html')
      }
    }
  }
});
