import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/globals.css';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    a11y: {
      test: 'todo',
    },
    docs: {
      toc: true,
    },
    layout: 'centered',
  },
} satisfies Preview;
