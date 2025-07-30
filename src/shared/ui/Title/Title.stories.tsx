import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TitleWithoutRouter } from './TitleWithoutRouter';

const meta: Meta<typeof TitleWithoutRouter> = {
  title: 'UI/Title',
  component: TitleWithoutRouter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '페이지 상단에 타이틀과 함께 뒤로가기 또는 기타 아이콘 버튼을 표시하는 컴포넌트입니다. 일관된 헤더 UI를 제공하며, 아이콘 유무에 따라 레이아웃이 자동으로 조정됩니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '표시할 타이틀 텍스트',
    },
    iconVariant: {
      control: 'select',
      options: ['none', 'back', 'close'],
      description: '아이콘 유형을 선택합니다',
    },
    onIconClick: {
      description: '아이콘 클릭 시 실행될 함수',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[375px] min-w-[320px] mx-auto border border-gray-200 bg-gray-700">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TitleWithoutRouter>;

export const Default: Story = {
  args: {
    title: '기본 타이틀(텍스트만)',
  },
};

export const WithBackIcon: Story = {
  args: {
    title: '뒤로가기가 있는 타이틀',
    iconVariant: 'back',
    onIconClick: () => alert('뒤로가기 버튼 클릭'),
  },
};

export const WithCloseIcon: Story = {
  args: {
    title: '닫기 버튼이 있는 타이틀',
    iconVariant: 'close',
    onIconClick: () => alert('닫기 버튼 클릭'),
  },
};
