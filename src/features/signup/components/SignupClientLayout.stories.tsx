import type { Meta, StoryObj } from '@storybook/react';

// Mock SignupClientLayout for Storybook
const MockSignupClientLayout = ({
  children,
  isProfileComplete = false,
  userRole = 'ROLE_GUEST',
  isLoading = false,
  currentPath = '/signup/profile',
}: {
  children: React.ReactNode;
  isProfileComplete?: boolean;
  userRole?: string;
  isLoading?: boolean;
  currentPath?: string;
}) => {
  // Mock routing logic
  const shouldRedirectToProfile = currentPath === '/signup/plan' && !isProfileComplete;
  const shouldRedirectToHome = !isLoading && userRole === 'ROLE_USER';

  return (
    <div className="contents">
      {/* Mock routing status display */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg text-sm">
        <div>현재 경로: {currentPath}</div>
        <div>프로필 완성: {isProfileComplete ? '완료' : '미완료'}</div>
        <div>사용자 역할: {userRole}</div>
        <div>로딩 상태: {isLoading ? '로딩 중' : '완료'}</div>
        {shouldRedirectToProfile && (
          <div className="text-red-600 font-bold">→ 프로필 페이지로 리다이렉트 필요</div>
        )}
        {shouldRedirectToHome && (
          <div className="text-red-600 font-bold">→ 홈 페이지로 리다이렉트 필요</div>
        )}
      </div>

      {/* Children content */}
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">{children}</div>
    </div>
  );
};

const meta: Meta<typeof MockSignupClientLayout> = {
  title: 'Signup/SignupClientLayout',
  component: MockSignupClientLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isProfileComplete: {
      control: { type: 'boolean' },
      description: '프로필 완성 여부',
    },
    userRole: {
      control: { type: 'select' },
      options: ['ROLE_GUEST', 'ROLE_USER', 'ROLE_ADMIN'],
      description: '사용자 역할',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    currentPath: {
      control: { type: 'select' },
      options: ['/signup/profile', '/signup/plan', '/signup/privacy'],
      description: '현재 경로',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>회원가입 컨텐츠</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};

export const ProfileComplete: Story = {
  args: {
    children: <div>프로필 완성된 회원가입 컨텐츠</div>,
    isProfileComplete: true,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/plan',
  },
};

export const Loading: Story = {
  args: {
    children: <div>로딩 중인 회원가입 컨텐츠</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: true,
    currentPath: '/signup/profile',
  },
};

export const UserRole: Story = {
  args: {
    children: <div>이미 로그인된 사용자</div>,
    isProfileComplete: true,
    userRole: 'ROLE_USER',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};

export const PlanPageWithoutProfile: Story = {
  args: {
    children: <div>프로필 없이 플랜 페이지 접근</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/plan',
  },
};

export const AdminUser: Story = {
  args: {
    children: <div>관리자 사용자</div>,
    isProfileComplete: true,
    userRole: 'ROLE_ADMIN',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};
