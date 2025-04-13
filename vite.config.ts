import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Enable React Refresh
      fastRefresh: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});