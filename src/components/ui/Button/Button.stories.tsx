import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';

const variantOptions = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
  'exploration-button',
  'cancel-button',
  'number-badge',
  'action-button',
  'next-button',
  'project-button',
] as const;

const sizeOptions = ['sm', 'default', 'lg', 'icon', 'full-width', 'compact'] as const;

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'shadcn/ui 스타일의 기본 Button 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      description: '버튼의 스타일 variant',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: '버튼의 크기',
    },
    icon: {
      control: false,
      description: '버튼 아이콘 (JSX)',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    className: {
      control: 'text',
      description: '추가적인 Tailwind 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 아이콘 정의
const CloudIcon = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

const AntennaIcon = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84l.03.06L12 22l5.56-8.1.03-.06A7.945 7.945 0 0 0 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// 기본 스토리들
export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    children: '확인',
  },
};

export const NextButton: Story = {
  args: {
    variant: 'next-button',
    size: 'full-width',
    children: '다음',
  },
};

export const CancelButton: Story = {
  args: {
    variant: 'cancel-button',
    size: 'full-width',
    children: '취소',
  },
};

export const NumberBadge: Story = {
  args: {
    variant: 'number-badge',
    size: 'compact',
    children: '1,100',
  },
};

export const ProjectButton: Story = {
  args: {
    variant: 'project-button',
    size: 'default',
    children: '프로젝트',
  },
};

export const ExplorationButton: Story = {
  args: {
    variant: 'exploration-button',
    icon: CloudIcon,
    size: 'default',
    children: '일괄구매',
  },
};

export const ExplorationCondition: Story = {
  args: {
    variant: 'exploration-button',
    icon: CloudIcon,
    size: 'default',
    children: '탐색 조건',
  },
};

export const ExplorationStart: Story = {
  args: {
    variant: 'exploration-button',
    icon: AntennaIcon,
    iconPosition: 'right',
    size: 'default',
    children: '탐색 시작',
  },
};

// Playground
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    variant: 'exploration-button',
    size: 'default',
    icon: CloudIcon,
    iconPosition: 'left',
    children: '탐색 조건',
  },
  render: (args) => <Button {...args} />,
};

// 모든 Variant 보기
export const AllVariants: Story = {
  name: '📋 All Variants',
  render: () => (
    <div className="flex flex-wrap gap-4">
      {variantOptions.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

// 모든 Size 보기
export const AllSizes: Story = {
  name: '📏 All Sizes',
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      {sizeOptions.map((size) => (
        <Button key={size} size={size} variant="primary">
          {size === 'icon' ? '⭐️' : size}
        </Button>
      ))}
    </div>
  ),
};

// 아이콘 사용 예시
export const WithIcons: Story = {
  name: '🎨 With Icons',
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button variant="exploration-button" icon={CloudIcon}>
        탐색 조건
      </Button>
      <Button variant="exploration-button" icon={AntennaIcon} iconPosition="right">
        탐색 시작
      </Button>
      <Button variant="exploration-button">일반 버튼</Button>
      <Button variant="primary" icon={CloudIcon}>
        Primary with Icon
      </Button>
    </div>
  ),
};
