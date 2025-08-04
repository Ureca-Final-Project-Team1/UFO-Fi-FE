import type { Meta, StoryObj } from '@storybook/react';

// Mock provider for Storybook
const MockEditProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white mb-2">EditProvider (Mock)</h3>
      <p className="text-gray-300 mb-4">
        이 컴포넌트는 Context Provider로, 실제 사용 시에는 게시글 편집 페이지에서 사용됩니다.
      </p>
      <div className="border border-gray-600 rounded p-3">{children}</div>
    </div>
  );
};

const meta: Meta<typeof MockEditProvider> = {
  title: 'Exchange/EditProvider',
  component: MockEditProvider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-gray-700 rounded-lg">
        <h3 className="text-white mb-2">EditProvider 내부 컴포넌트</h3>
        <p className="text-gray-300">
          이 컴포넌트는 Context Provider로, 실제 사용 시에는 게시글 편집 페이지에서 사용됩니다.
        </p>
      </div>
    ),
  },
};

export const WithMockContent: Story = {
  args: {
    children: (
      <div className="p-4 bg-blue-900 rounded-lg">
        <h3 className="text-white mb-2">편집 폼 예시</h3>
        <div className="space-y-2">
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-300">제목: </span>
            <span className="text-white">SKT 5G 데이터 판매</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-300">용량: </span>
            <span className="text-white">10GB</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-300">가격: </span>
            <span className="text-white">1,500 ZET</span>
          </div>
        </div>
      </div>
    ),
  },
};
