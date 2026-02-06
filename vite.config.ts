import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ceci permet d'éviter les crashs si la variable d'env n'est pas définie
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});