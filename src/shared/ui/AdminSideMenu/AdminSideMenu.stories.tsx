import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AdminSideMenu } from './AdminSideMenu';

const meta: Meta<typeof AdminSideMenu> = {
  title: 'Admin/AdminSideMenu',
  component: AdminSideMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin 페이지 전용 반응형 사이드 메뉴(햄버거 메뉴 포함) 컴포넌트입니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AdminSideMenu>;

export const Default: Story = {
  render: () => <AdminSideMenu />,
};
