import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  build: {
    outDir: 'build',
    target: 'es2022',
    base: './' // This is set to allow for deployments on dynamic subpaths (i.e. - test.phlask.me)
  },
  plugins: [
    react(),
    tsconfigPaths({ allowJS: true }),
    eslint({ failOnError: true }),
    svgr({ svgrOptions: { configFile: '.svgrrc.json' } })
  ]
}));
