import type { Meta, StoryObj } from '@storybook/nextjs';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '전역에서 사용할 수 있는 Skeleton(스켈레톤) 컴포넌트입니다. 로딩 상태를 시각적으로 표시할 때 사용하며, width, height, borderRadius 등 style props로 다양한 형태를 만들 수 있습니다.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Skeleton> = {
  args: {
    style: { width: 200, height: 20 },
  },
  render: (args) => <Skeleton {...args} />,
};

export const Playground: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton style={{ width: 120, height: 20 }} />
      <Skeleton style={{ width: 80, height: 80, borderRadius: 40 }} />
      <Skeleton style={{ width: 200, height: 12, borderRadius: 6 }} />
      <Skeleton style={{ width: 100, height: 40, borderRadius: 8 }} />
    </div>
  ),
};
