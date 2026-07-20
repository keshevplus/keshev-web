import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: './',
    plugins: [react()],
    build: {
      outDir: './dist',
      sourcemap: true,
      chunkSizeWarningLimit: 1500,
    },
    define: {
      'import.meta.env': {
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
        VITE_BASE_URL: JSON.stringify(env.VITE_BASE_URL),
        VITE_EMAILJS_PUBLIC_KEY: JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
        VITE_EMAILJS_SERVICE_ID: JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
        VITE_EMAILJS_TEMPLATE_ID: JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
        VITE_APP_TITLE: JSON.stringify(env.VITE_APP_TITLE),
        VITE_ADMIN_DASHBOARD_URL: JSON.stringify(env.VITE_ADMIN_DASHBOARD_URL),
      }
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
    }
  }
});
