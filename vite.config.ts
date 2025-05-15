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
            chunkSizeWarningLimit: 1500, // Adjust the warning limit if needed
          },
          define: {
            'import.meta.env': {
              VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
              VITE_BASE_URL: JSON.stringify(env.VITE_BASE_URL),
              VITE_ADMIN_TEMPLATE_ID: JSON.stringify(env.VITE_ADMIN_TEMPLATE_ID),
              VITE_APP_TITLE: JSON.stringify(env.VITE_APP_TITLE),
              // Add other VITE_ variables you want to expose here
            }
          },
          // Configure the dev server to handle client-side routing
          server: {
            host: true,
            port: 5173, // Default Vite port
            strictPort: true,
            open: true,
            proxy: {
              // Forward API requests to your local Express server in development
              '/api': {
                target: mode === 'development' ? 'http://localhost:5000' : 'https://api.keshevplus.co.il',
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
        }
      });