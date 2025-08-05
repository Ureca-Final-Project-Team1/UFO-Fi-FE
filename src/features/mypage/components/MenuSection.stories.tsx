import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon } from '@/shared';

import MenuSection from './MenuSection';

// 공통 Story Wrapper Component
interface StoryWrapperProps {
  args: {
    title?: string;
    items?: Array<{ label: string; onClick: () => void }>;
  };
  title?: string;
  isDesktop?: boolean;
  children?: React.ReactNode;
}

const StoryWrapper = ({
  args,
  title = '마이페이지',
  isDesktop = false,
  children,
}: StoryWrapperProps) => (
  <div className="w-full h-full flex flex-col bg-gray-900">
    <div className={`px-4 pt-4 ${isDesktop ? 'max-w-2xl mx-auto w-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-bold">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {children || (
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MenuSection {...args} />
          </div>
        )}
      </div>
    </div>
  </div>
);

const meta: Meta<typeof MenuSection> = {
  title: 'Mypage/MenuSection',
  component: MenuSection,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '메뉴 섹션 제목',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MenuSection>;

export const Default: Story = {
  args: {
    title: '계정 설정',
    items: [
      { label: '프로필 수정', onClick: () => {} },
      { label: '알림 설정', onClick: () => {} },
      { label: '개인정보', onClick: () => {} },
    ],
  },
  render: (args) => <StoryWrapper args={args} />,
};

export const AccountSettings: Story = {
  args: {
    title: '계정 설정',
    items: [
      { label: '프로필 수정', onClick: () => {} },
      { label: '닉네임 변경', onClick: () => {} },
      { label: '비밀번호 변경', onClick: () => {} },
      { label: '이메일 변경', onClick: () => {} },
    ],
  },
  render: (args) => <StoryWrapper args={args} />,
};

export const AppSettings: Story = {
  args: {
    title: '앱 설정',
    items: [
      { label: '알림 설정', onClick: () => {} },
      { label: '언어 설정', onClick: () => {} },
      { label: '테마 설정', onClick: () => {} },
    ],
  },
  render: (args) => <StoryWrapper args={args} />,
};

export const MultipleSections: Story = {
  args: {
    title: '계정 설정',
    items: [
      { label: '프로필 수정', onClick: () => {} },
      { label: '닉네임 변경', onClick: () => {} },
      { label: '비밀번호 변경', onClick: () => {} },
    ],
  },
  render: (args) => (
    <StoryWrapper args={args}>
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <MenuSection {...args} />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <MenuSection
          title="앱 설정"
          items={[
            { label: '알림 설정', onClick: () => {} },
            { label: '언어 설정', onClick: () => {} },
            { label: '테마 설정', onClick: () => {} },
          ]}
        />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <MenuSection
          title="고객 지원"
          items={[
            { label: '자주 묻는 질문', onClick: () => {} },
            { label: '문의하기', onClick: () => {} },
            { label: '버그 신고', onClick: () => {} },
          ]}
        />
      </div>
    </StoryWrapper>
  ),
};

export const Desktop: Story = {
  args: {
    title: '데스크톱 메뉴',
    items: [
      { label: '프로필 수정', onClick: () => {} },
      { label: '알림 설정', onClick: () => {} },
      { label: '개인정보', onClick: () => {} },
    ],
  },
  render: (args) => <StoryWrapper args={args} title="데스크톱 마이페이지" isDesktop />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
