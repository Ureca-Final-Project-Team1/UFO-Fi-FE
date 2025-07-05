import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // prettier와 충돌 제거
  prettier,

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      // dynamic ESM import
      import: (await import('eslint-plugin-import')).default,
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
    },
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/extensions': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

export default config;
