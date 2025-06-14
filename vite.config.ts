import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
<<<<<<< HEAD

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
        // Forward API requests to your local backend server in development
        '/api': {
          target: env.VITE_API_BASE_URL_DEV,  // local backend for API calls
          changeOrigin: true,
          secure: false,
        },
        '/content': {
          target: env.VITE_API_BASE_URL_DEV, // local backend for content API),
          changeOrigin: true,
          secure: false,
        }
      },
      historyApiFallback: true, // Handle client-side routing
      hmr: {
        overlay: false, // Prevent crashes due to missing files
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  }
});
=======
      
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
              VITE_EMAILJS_PUBLIC_KEY: JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
              VITE_EMAILJS_SERVICE_ID: JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
              VITE_EMAILJS_TEMPLATE_ID: JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
              VITE_ADMIN_TEMPLATE_ID: JSON.stringify(env.VITE_ADMIN_TEMPLATE_ID),
              VITE_ADMIN_EMAIL: JSON.stringify(env.VITE_ADMIN_EMAIL),
              VITE_ADMIN_PASSWORD: JSON.stringify(env.VITE_ADMIN_PASSWORD),
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
              // Forward API requests to your Express server
              '/api': {
                target: 'https://api.keshevplus.co.il',
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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
