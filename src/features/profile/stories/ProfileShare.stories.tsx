import type { Meta, StoryObj } from '@storybook/react';

import type { ProfileUser } from '@/api/types/profile';
import { IMAGE_PATHS } from '@/constants/images';

import { ProfileShare } from '../components/ProfileShare/ProfileShare';

const mockProfile: ProfileUser = {
  userId: 308,
  nickname: '신나는 지구인 #308',
  profileImageUrl: IMAGE_PATHS.AVATAR,
  followerCount: 21,
  followingCount: 6,
  tradePostsRes: [],
};

const meta: Meta<typeof ProfileShare> = {
  title: 'Components/Profile/ProfileShare',
  component: ProfileShare,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'rgba(0,0,0,0.5)' }],
    },
  },
  argTypes: {
    profile: {
      control: 'object',
      description: '공유할 프로필 정보입니다.',
    },
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태입니다.',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 상태입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileShare>;

export const Default: Story = {
  args: {
    profile: mockProfile,
    isOpen: true,
    onClose: () => alert('모달 닫기'),
  },
};
