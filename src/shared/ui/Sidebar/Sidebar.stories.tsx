import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '관리자 사이드바 컴포넌트입니다. 계층적 메뉴 구조를 지원하며 다양한 테마와 크기를 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'minimal'],
      description: '사이드바의 테마 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'large'],
      description: '사이드바의 크기',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: (args) => <Sidebar {...args} />,
  args: {
    variant: 'default',
    size: 'default',
  },
};

export const Dark: Story = {
  render: (args) => (
    <div className="bg-gray-900 min-h-screen">
      <Sidebar {...args} />
    </div>
  ),
  args: {
    variant: 'dark',
    size: 'default',
  },
};

export const Minimal: Story = {
  render: (args) => <Sidebar {...args} />,
  args: {
    variant: 'minimal',
    size: 'default',
  },
};

export const Compact: Story = {
  render: (args) => <Sidebar {...args} />,
  args: {
    variant: 'default',
    size: 'compact',
  },
};

export const Large: Story = {
  render: (args) => <Sidebar {...args} />,
  args: {
    variant: 'default',
    size: 'large',
  },
};

export const DarkCompact: Story = {
  render: (args) => (
    <div className="bg-gray-900 min-h-screen">
      <Sidebar {...args} />
    </div>
  ),
  args: {
    variant: 'dark',
    size: 'compact',
  },
};

export const MinimalLarge: Story = {
  render: (args) => <Sidebar {...args} />,
  args: {
    variant: 'minimal',
    size: 'large',
  },
};
