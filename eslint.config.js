/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';

import eslintCss from '@eslint/css';
import eslintJs from '@eslint/js';
import eslintPluginYml from 'eslint-plugin-yml';
import * as eslintPluginMdx from 'eslint-plugin-mdx';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintTs from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  globalIgnores([
    '**/.yarn',
    '**/node_modules',
    // TODO(simek): move `lint-examples` to 'packages' directory, refactor ESLint setup
    'scripts/lint-examples/out',
    // TODO(simek): move `sync-api-docs` to 'packages' directory, refactor ESLint setup
    'sync-api-docs',
    'website/.docusaurus',
    'website/build',
    'website/static',
    'README.md',
  ]),

  eslintTs.configs.recommended,
  ...eslintPluginYml.configs['flat/standard'],
  eslintPluginPrettier,

  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        MutationObserver: 'readonly',
      },
    },
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    ...eslintJs.configs.recommended,
    rules: {
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    settings: {
      'import/resolver': {
        typescript: {
          project: 'website/tsconfig.json',
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'es2023',
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    // TODO(simek): figure out SCSS linting, since `@eslint/css` does not support it yet
    // @see https://github.com/eslint/css/issues/90
    files: ['**/*.css'],
    ...eslintCss.configs.recommended,
    language: 'css/css',
    plugins: {
      css: eslintCss,
    },
    rules: {
      'css/no-invalid-properties': [
        'error',
        {
          allowUnknownVariables: true,
        },
      ],
    },
  },

  {
    files: ['**/*.md', '**/*.mdx'],
    ...eslintPluginMdx.flat,
    processor: eslintPluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
      remarkConfigPath: 'website/.remarkrc.mjs',
    }),
  },
]);
