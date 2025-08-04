import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Icon } from '@/shared';

import { NicknameEditor } from './NicknameEditor';

// Story Wrapper Components
const DefaultStoryWrapper = (args: {
  nickname?: string;
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [nickname, setNickname] = useState(args.nickname);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <NicknameEditor
              {...args}
              nickname={nickname}
              setNickname={setNickname}
              onSave={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WithNicknameStoryWrapper = (args: {
  nickname?: string;
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [nickname, setNickname] = useState(args.nickname);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <NicknameEditor
              {...args}
              nickname={nickname}
              setNickname={setNickname}
              onSave={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingStoryWrapper = (args: {
  nickname?: string;
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [nickname, setNickname] = useState(args.nickname);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <NicknameEditor
              {...args}
              nickname={nickname}
              setNickname={setNickname}
              onSave={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopStoryWrapper = (args: {
  nickname?: string;
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [nickname, setNickname] = useState(args.nickname);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <NicknameEditor
              {...args}
              nickname={nickname}
              setNickname={setNickname}
              onSave={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof NicknameEditor> = {
  title: 'Mypage/NicknameEditor',
  component: NicknameEditor,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    nickname: {
      control: { type: 'text' },
      description: '현재 닉네임',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    onSave: {
      action: 'nickname saved',
      description: '닉네임 저장 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NicknameEditor>;

export const Default: Story = {
  args: {
    nickname: '',
    isLoading: false,
  },
  render: (args) => <DefaultStoryWrapper {...args} />,
};

export const WithNickname: Story = {
  args: {
    nickname: '지구인123',
    isLoading: false,
  },
  render: (args) => <WithNicknameStoryWrapper {...args} />,
};

export const Loading: Story = {
  args: {
    nickname: '새닉네임',
    isLoading: true,
  },
  render: (args) => <LoadingStoryWrapper {...args} />,
};

export const InvalidNickname: Story = {
  args: {
    nickname: '매우긴닉네임입니다',
    isLoading: false,
  },
  render: (args) => <DefaultStoryWrapper {...args} />,
};

export const Desktop: Story = {
  args: {
    nickname: '데스크톱유저',
    isLoading: false,
  },
  render: (args) => <DesktopStoryWrapper {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
