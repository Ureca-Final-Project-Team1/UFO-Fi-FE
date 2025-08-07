import path from 'path';

import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcssPostcss from '@tailwindcss/postcss';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  viteFinal: async (config) => {
    config.css = {
      ...config.css,
      postcss: {
        plugins: [tailwindcssPostcss()],
      },
    };

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    // "use client" 지시어 처리
    if (config.esbuild) {
      config.esbuild = {
        ...config.esbuild,
        supported: {
          ...config.esbuild?.supported,
          'top-level-await': true,
        },
      };
    }

    // Vite 플러그인 추가
    if (config.plugins) {
      config.plugins.push({
        name: 'remove-use-client',
        transform(code, id) {
          if (id.endsWith('.tsx') || id.endsWith('.ts')) {
            // "use client" 지시어 제거
            return code.replace(/"use client";?\n?/g, '');
          }
          return code;
        },
      });
    }

    return config;
  },
};

export default config;
