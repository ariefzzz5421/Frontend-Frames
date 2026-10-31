import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/designs/3d-portfolio/',
  build: {
    outDir: fileURLToPath(new URL('../../dashboard/designs/3d-portfolio', import.meta.url)),
    emptyOutDir: true,
    assetsDir: 'assets',
  },
});
