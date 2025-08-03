import type { Meta, StoryObj } from '@storybook/nextjs';

import { Avatar } from './Avatar';
import { Icon } from '../Icons';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자 아바타를 표시하는 컴포넌트입니다. 다양한 크기와 스타일을 지원합니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '아바타 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'selling'],
      description: '아바타 스타일',
    },
    children: {
      control: false,
      description: '아바타 내부에 들어갈 컨텐츠 (보통 아이콘)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
  render: (args) => (
    <Avatar {...args}>
      <Icon name="astronaut" className="w-8 h-8 text-gray-600" />
    </Avatar>
  ),
};

export const Selling: Story = {
  args: {
    size: 'md',
    variant: 'selling',
  },
  render: (args) => (
    <Avatar {...args}>
      <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
    </Avatar>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar size="sm" variant="selling">
          <Icon name="astronaut" className="size-5 text-purple-200" />
        </Avatar>
        <p className="text-xs mt-1 text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <Avatar size="md" variant="selling">
          <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
        </Avatar>
        <p className="text-xs mt-1 text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <Avatar size="lg" variant="selling">
          <Icon name="astronaut" className="size-12 text-purple-200" />
        </Avatar>
        <p className="text-xs mt-1 text-gray-600">Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 Avatar를 보여줍니다.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar variant="default">
          <Icon name="astronaut" className="w-8 h-8 text-gray-600" />
        </Avatar>
        <p className="text-xs mt-1 text-gray-600">Default</p>
      </div>
      <div className="text-center">
        <Avatar variant="selling">
          <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
        </Avatar>
        <p className="text-xs mt-1 text-gray-600">Selling</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스타일 variant의 Avatar를 보여줍니다.',
      },
    },
  },
};
