import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  base: './', // This is set to allow for deployments on dynamic subpaths (i.e. - test.phlask.me)
  build: {
    outDir: 'build',
    target: 'es2022'
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({ svgrOptions: { configFile: '.svgrrc.json' } })
  ]
}));
