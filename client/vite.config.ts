import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: './',
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 500, // Adjust the warning limit if needed
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React and React-DOM into a separate chunk
            react: ['react', 'react-dom'],
            // Split Redux-related libraries into a separate chunk
            redux: ['@reduxjs/toolkit', 'react-redux'],
            // Split other large dependencies into separate chunks
            vendor: ['zod', 'react-router-dom'],
          },
        },
      },
    },
    define: {
      'process.env': {}
    },
    // Configure the dev server to handle client-side routing
    server: {
      host: true,
      port: 5173, // Default Vite port
      strictPort: true,
      open: true,
      proxy: {
        // Forward API requests to your Express server
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
      historyApiFallback: true, // Handle client-side routing
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  };
});