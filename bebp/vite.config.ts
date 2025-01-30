import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: './index.html', // Main entry
    },
    sourcemap: true,
    target: 'es2015', // Output JavaScript target
  }
});
