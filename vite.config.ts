import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Local playground of the kit: `npm run dev`. Not part of the package.
export default defineConfig({
  root: 'playground',
  publicDir: '../assets',
  plugins: [react()],
  build: {
    outDir: '../dist-playground',
    emptyOutDir: true,
  },
});
