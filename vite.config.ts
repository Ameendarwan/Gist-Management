import { defineConfig, loadEnv } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      port: 3000,
    },
    define: {
      'import.meta.env': env,
    },
  };
});
