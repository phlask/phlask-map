import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  build: {
    outDir: 'build',
    target: 'es2022'
  },
  server: {
    port: 3000
  },
  plugins: [
    react(),
    tsconfigPaths({ allowJS: true }),
    eslint({ failOnError: true }),
    svgr({ svgrOptions: { configFile: '.svgrrc.json' } })
  ]
}));
