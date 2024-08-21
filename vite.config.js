import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig(() => {
  return {
    // esbuild: {
    //   loader: { '.js': 'jsx' }
    // },
    build: {
      outDir: 'build'
    },
    plugins: [
      react(),
      tsconfigPaths({ allowJS: true }),
      eslint({ failOnError: true }),
      svgr({ svgrOptions: { configFile: '.svgrrc.json' } }),
      Unfonts({ google: { families: ['Roboto'] } })
    ]
  };
});
