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
      pluginCypress.configs.globals,
      reactHooks.configs.flat['recommended-latest']
    ],
    plugins: {
      eslintConfigPrettier
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.cy.{js.ts}'],
    extends: [pluginCypress.configs.recommended, pluginCypress.configs.globals]
  }
]);
