import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  root: './',
  plugins: [react()],
  build: {
    outDir: './dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: true,
    historyApiFallback: true,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
