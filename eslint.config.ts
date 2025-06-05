// filepath: c:\KESHEVPLUS\20250601\keshev-web\eslint.config.ts
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      unusedImports: eslintPluginUnusedImports,
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
