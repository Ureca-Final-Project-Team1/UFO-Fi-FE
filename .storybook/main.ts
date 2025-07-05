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

    return config;
  },
};

export default config;
