import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginCypress from 'eslint-plugin-cypress';

export default defineConfig([
  globalIgnores(['build']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
      storybook.configs['flat/recommended'],
      pluginCypress.configs.recommended,
      pluginCypress.configs.globals
    ],
    plugins: {
      'react-hooks': reactHooks.configs['recommended-latest'],
      eslintConfigPrettier
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  },
  {
    files: ['**/*.cy.{js.ts}'],
    extends: [pluginCypress.configs.recommended, pluginCypress.configs.globals]
  }
]);
