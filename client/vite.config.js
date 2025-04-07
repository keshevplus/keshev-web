import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Example: Split React into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
  },
});
