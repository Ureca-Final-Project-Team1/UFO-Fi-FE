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
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">회원가입 클라이언트 레이아웃</h2>

          <div className="contents">
            {/* Mock routing status display */}
            <div className="mb-4 p-3 bg-gray-700/50 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">현재 경로:</span>
                <span className="text-white font-mono">{currentPath}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">프로필 완성:</span>
                <span className={isProfileComplete ? 'text-green-400' : 'text-red-400'}>
                  {isProfileComplete ? '완료' : '미완료'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">사용자 역할:</span>
                <span className="text-blue-400 font-mono">{userRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">로딩 상태:</span>
                <span className={isLoading ? 'text-yellow-400' : 'text-green-400'}>
                  {isLoading ? '로딩 중' : '완료'}
                </span>
              </div>

              {shouldRedirectToProfile && (
                <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-xs">
                  ⚠️ 프로필 페이지로 리다이렉트 필요
                </div>
              )}
              {shouldRedirectToHome && (
                <div className="mt-2 p-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs">
                  ⚠️ 홈 페이지로 리다이렉트 필요
                </div>
              )}
            </div>

            {/* Children content */}
            <div className="border-2 border-dashed border-gray-600 p-4 rounded-lg bg-gray-700/30">
              <div className="text-gray-300 text-sm mb-2">회원가입 컨텐츠:</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockSignupClientLayout> = {
  title: 'Signup/SignupClientLayout',
  component: MockSignupClientLayout,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
type Story = StoryObj<typeof MockSignupClientLayout>;

export const Default: Story = {
  args: {
    children: <div className="text-white">회원가입 컨텐츠</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};

export const ProfileComplete: Story = {
  args: {
    children: <div className="text-white">프로필 완성된 회원가입 컨텐츠</div>,
    isProfileComplete: true,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/plan',
  },
};

export const Loading: Story = {
  args: {
    children: <div className="text-white">로딩 중인 회원가입 컨텐츠</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: true,
    currentPath: '/signup/profile',
  },
};

export const UserRole: Story = {
  args: {
    children: <div className="text-white">이미 로그인된 사용자</div>,
    isProfileComplete: true,
    userRole: 'ROLE_USER',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};

export const PlanPageWithoutProfile: Story = {
  args: {
    children: <div className="text-white">프로필 없이 플랜 페이지 접근</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/plan',
  },
};

export const AdminUser: Story = {
  args: {
    children: <div className="text-white">관리자 사용자</div>,
    isProfileComplete: true,
    userRole: 'ROLE_ADMIN',
    isLoading: false,
    currentPath: '/signup/profile',
  },
};

export const Desktop: Story = {
  args: {
    children: <div className="text-white">데스크톱 회원가입 컨텐츠</div>,
    isProfileComplete: false,
    userRole: 'ROLE_GUEST',
    isLoading: false,
    currentPath: '/signup/profile',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
