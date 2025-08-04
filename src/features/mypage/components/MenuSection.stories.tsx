import type { Meta, StoryObj } from '@storybook/react';

// Mock MenuSection for Storybook
const MockMenuSection = ({
  title = '메뉴 섹션',
  items = [
    { label: '프로필 수정', onClick: () => console.log('프로필 수정 클릭') },
    { label: '알림 설정', onClick: () => console.log('알림 설정 클릭') },
    { label: '개인정보', onClick: () => console.log('개인정보 클릭') },
  ],
}: {
  title?: string;
  items?: Array<{ label: string; onClick?: () => void }>;
}) => {
  return (
    <section className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li
            key={item.label}
            className="hover:text-white cursor-pointer flex items-center justify-between group py-2 px-3 rounded hover:bg-gray-700 transition-colors"
            onClick={item.onClick}
          >
            <span className="text-gray-300 group-hover:text-white">{item.label}</span>
            <span className="text-gray-400 group-hover:text-white text-lg">→</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const meta: Meta<typeof MockMenuSection> = {
  title: 'Mypage/MenuSection',
  component: MockMenuSection,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '계정 설정',
    items: [
      { label: '프로필 수정', onClick: () => console.log('프로필 수정 클릭') },
      { label: '알림 설정', onClick: () => console.log('알림 설정 클릭') },
      { label: '개인정보', onClick: () => console.log('개인정보 클릭') },
    ],
  },
};

export const AccountSettings: Story = {
  args: {
    title: '계정 설정',
    items: [
      { label: '프로필 수정', onClick: () => console.log('프로필 수정 클릭') },
      { label: '닉네임 변경', onClick: () => console.log('닉네임 변경 클릭') },
      { label: '비밀번호 변경', onClick: () => console.log('비밀번호 변경 클릭') },
      { label: '이메일 변경', onClick: () => console.log('이메일 변경 클릭') },
    ],
  },
};

export const AppSettings: Story = {
  args: {
    title: '앱 설정',
    items: [
      { label: '알림 설정', onClick: () => console.log('알림 설정 클릭') },
      { label: '언어 설정', onClick: () => console.log('언어 설정 클릭') },
      { label: '테마 설정', onClick: () => console.log('테마 설정 클릭') },
    ],
  },
};

export const Support: Story = {
  args: {
    title: '고객 지원',
    items: [
      { label: '자주 묻는 질문', onClick: () => console.log('FAQ 클릭') },
      { label: '문의하기', onClick: () => console.log('문의하기 클릭') },
      { label: '버그 신고', onClick: () => console.log('버그 신고 클릭') },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    title: '단일 메뉴',
    items: [{ label: '로그아웃', onClick: () => console.log('로그아웃 클릭') }],
  },
};

export const LongTitle: Story = {
  args: {
    title: '매우 긴 메뉴 섹션 제목입니다',
    items: [
      { label: '프로필 수정', onClick: () => console.log('프로필 수정 클릭') },
      { label: '알림 설정', onClick: () => console.log('알림 설정 클릭') },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    title: '많은 메뉴 항목',
    items: [
      { label: '프로필 수정', onClick: () => console.log('프로필 수정 클릭') },
      { label: '알림 설정', onClick: () => console.log('알림 설정 클릭') },
      { label: '개인정보', onClick: () => console.log('개인정보 클릭') },
      { label: '보안 설정', onClick: () => console.log('보안 설정 클릭') },
      { label: '결제 정보', onClick: () => console.log('결제 정보 클릭') },
      { label: '사용 내역', onClick: () => console.log('사용 내역 클릭') },
      { label: '고객 지원', onClick: () => console.log('고객 지원 클릭') },
      { label: '로그아웃', onClick: () => console.log('로그아웃 클릭') },
    ],
  },
};
