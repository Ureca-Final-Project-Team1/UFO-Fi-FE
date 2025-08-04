import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Sidebar } from '@/shared';

const meta: Meta<typeof Sidebar> = {
  title: 'Admin/AdminSideMenu',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - 데스크탑에서만 표시 */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 사용자</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">활성 사용자</h3>
                <p className="text-3xl font-bold text-green-600">1,100</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 게시물</h3>
                <p className="text-3xl font-bold text-purple-600">5,678</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">신고 접수</h3>
                <p className="text-3xl font-bold text-red-600">89</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area - 모바일에서는 사이드바 없음 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 사용자</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">활성 사용자</h3>
                <p className="text-3xl font-bold text-green-600">1,100</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전체 게시물</h3>
                <p className="text-3xl font-bold text-purple-600">5,678</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">신고 접수</h3>
                <p className="text-3xl font-bold text-red-600">89</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
