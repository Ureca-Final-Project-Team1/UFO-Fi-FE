import type { Meta, StoryObj } from '@storybook/react';

import type { ProfileUser } from '@/api/types/profile';

import { ShareButtons } from '../components/ProfileShare/ShareButtons';

const mockProfile: ProfileUser = {
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl:
    'https://ufo-fi-service-bucket.s3.ap-northeast-2.amazonaws.com/profile-image/profile-8.png',
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [],
};

const meta: Meta<typeof ShareButtons> = {
  title: 'Components/Profile/ShareButtons',
  component: ShareButtons,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    profile: {
      control: 'object',
      description: '공유할 프로필 정보',
    },
    profileUrl: {
      control: 'text',
      description: '공유할 프로필 URL',
    },
    onCopyLink: {
      action: 'copy-link',
      description: '링크 복사 콜백',
    },
    onClose: {
      action: 'close',
      description: '모달 닫기 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareButtons>;

export const Default: Story = {
  args: {
    profile: mockProfile,
    profileUrl: 'https://ufo-fi.com/profile/1',
    onCopyLink: () => alert('링크 복사'),
    onClose: () => alert('모달 닫기'),
  },
};
