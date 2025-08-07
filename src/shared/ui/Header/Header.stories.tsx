import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '관리자 페이지용 헤더 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'elevated', 'transparent', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    userInfoDisplay: {
      control: { type: 'select' },
      options: ['full', 'avatar', 'hidden'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    userName: '김어드민',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Header 컴포넌트입니다.',
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    userName: '김어드민',
    variant: 'minimal',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: '최소한의 스타일을 적용한 Header입니다.',
      },
    },
  },
};

export const Elevated: Story = {
  args: {
    userName: '김어드민',
    variant: 'elevated',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: '그림자가 강화된 Header입니다.',
      },
    },
  },
};

export const Dark: Story = {
  args: {
    userName: '김어드민',
    variant: 'dark',
    logoVariant: 'minimal',
    logoIconVariant: 'minimal',
    logoTextVariant: 'minimal',
    userAvatarVariant: 'primary',
    userNameVariant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: '다크 테마 Header입니다.',
      },
    },
  },
};

export const AvatarOnly: Story = {
  args: {
    userName: '김어드민',
    userInfoDisplay: 'avatar',
  },
  parameters: {
    docs: {
      description: {
        story: '사용자 이름 없이 아바타만 표시하는 Header입니다.',
      },
    },
  },
};

export const NoUserInfo: Story = {
  args: {
    userName: '김어드민',
    showUserInfo: false,
  },
  parameters: {
    docs: {
      description: {
        story: '사용자 정보를 숨긴 Header입니다.',
      },
    },
  },
};

export const CustomLogo: Story = {
  args: {
    userName: '김어드민',
    logoText: 'Custom Brand',
    logoIcon: <span className="text-2xl">🚀</span>,
    logoIconVariant: 'custom',
    logoTextVariant: 'custom',
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 로고를 사용하는 Header입니다.',
      },
    },
  },
};
