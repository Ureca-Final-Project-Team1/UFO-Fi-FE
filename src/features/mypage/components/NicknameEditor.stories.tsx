import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock NicknameEditor for Storybook
const MockNicknameEditor = ({
  nickname = '',
  setNickname,
  onSave,
  isLoading = false,
}: {
  nickname?: string;
  setNickname?: (nickname: string) => void;
  onSave?: () => void;
  isLoading?: boolean;
}) => {
  const [localNickname, setLocalNickname] = useState(nickname);
  const isValid = localNickname.length > 0 && localNickname.length <= 15;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setLocalNickname(newNickname);
    setNickname?.(newNickname);
  };

  const handleSave = () => {
    onSave?.();
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h1 className="mb-4 font-semibold text-lg text-white">닉네임 수정</h1>
      <input
        value={localNickname}
        onChange={handleNicknameChange}
        placeholder="변경할 닉네임을 입력해주세요."
        maxLength={15}
        className={`w-full p-3 rounded-lg border transition-colors ${
          !isValid && localNickname ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {!isValid && localNickname && (
        <p className="text-red-500 text-sm mt-1">닉네임은 1~15자 이내여야 합니다.</p>
      )}
      <button
        className={`w-full h-12 mt-4 rounded-lg font-medium transition-colors ${
          !isValid || isLoading
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={!isValid || isLoading}
        onClick={handleSave}
      >
        {isLoading ? '저장 중...' : '닉네임 저장'}
      </button>
    </div>
  );
};

const meta: Meta<typeof MockNicknameEditor> = {
  title: 'Mypage/NicknameEditor',
  component: MockNicknameEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    setNickname: { action: 'nickname changed' },
    onSave: { action: 'save clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nickname: '',
  },
};

export const WithNickname: Story = {
  args: {
    nickname: '지구인123',
  },
};

export const LongNickname: Story = {
  args: {
    nickname: '매우긴닉네임입니다',
  },
};

export const Loading: Story = {
  args: {
    nickname: '새닉네임',
    isLoading: true,
  },
};

export const InvalidNickname: Story = {
  args: {
    nickname: '이것은매우매우매우긴닉네임입니다',
  },
};

export const EmptyNickname: Story = {
  args: {
    nickname: '',
  },
};

export const ShortNickname: Story = {
  args: {
    nickname: 'A',
  },
};
