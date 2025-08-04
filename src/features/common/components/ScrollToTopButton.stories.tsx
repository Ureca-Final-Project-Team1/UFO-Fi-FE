import type { Meta, StoryObj } from '@storybook/react';

import { ScrollToTopButton } from './ScrollToTopButton';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Common/ScrollToTopButton',
  component: ScrollToTopButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'scroll to top clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLongContent: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '긴 콘텐츠가 있을 때 스크롤 버튼이 나타나는 상태를 시뮬레이션합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', padding: '20px' }}>
        <div style={{ marginBottom: '100vh' }}>
          <h2>긴 콘텐츠</h2>
          <p>스크롤을 내려보세요...</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const Hidden: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '스크롤이 상단에 가까울 때 버튼이 숨겨진 상태입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100px', padding: '20px' }}>
        <h2>짧은 콘텐츠</h2>
        <p>스크롤이 필요하지 않아 버튼이 보이지 않습니다.</p>
        <Story />
      </div>
    ),
  ],
};
