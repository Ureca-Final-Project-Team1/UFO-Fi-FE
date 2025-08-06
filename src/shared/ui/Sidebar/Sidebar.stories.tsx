import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '사이드바 네비게이션 컴포넌트입니다. 계층적 메뉴 구조를 지원하며 다양한 variants를 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'elevated'],
      description: '사이드바 테마',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '사이드바 크기',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: '사이드바 위치',
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '내부 패딩',
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '메뉴 간격',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => <Sidebar />,
};

export const Dark: Story = {
  render: () => <Sidebar variant="dark" />,
};

export const Light: Story = {
  render: () => <Sidebar variant="light" />,
};

export const Elevated: Story = {
  render: () => <Sidebar variant="elevated" />,
};

export const Small: Story = {
  render: () => <Sidebar size="sm" />,
};

export const Large: Story = {
  render: () => <Sidebar size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <Sidebar size="xl" />,
};

export const Compact: Story = {
  render: () => <Sidebar padding="sm" spacing="sm" />,
};

export const Spacious: Story = {
  render: () => <Sidebar padding="lg" spacing="lg" />,
};

export const RightPosition: Story = {
  render: () => <Sidebar position="right" />,
};
