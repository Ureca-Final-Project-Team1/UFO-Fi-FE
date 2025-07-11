import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Radix 기반 탭 컴포넌트입니다. Root, List, Trigger, Content로 구성되며 다양한 콘텐츠 전환 UI에 활용됩니다.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

// ✅ 기본 탭
export const Default: Story = {
  name: '기본 사용',
  render: () => (
    <div className="bg-black p-6 rounded-lg max-w-xl w-full mx-auto">
      <Tabs defaultValue="tab1">
        <TabsList className="bg-transparent w-full">
          <TabsTrigger value="tab1" variant="darkTab" size="full">
            탭 1
          </TabsTrigger>
          <TabsTrigger value="tab2" variant="darkTab" size="full">
            탭 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="text-white">
          탭 1의 내용입니다.
        </TabsContent>
        <TabsContent value="tab2" className="text-white">
          탭 2의 내용입니다.
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 Tabs 컴포넌트입니다. 두 개의 탭이 전환되며 내용을 보여줍니다.',
      },
    },
  },
};

// ✅ 커스텀 스타일 적용
export const WithCustomTriggerSize: Story = {
  name: 'Trigger 커스텀 스타일',
  render: () => (
    <div className="bg-black p-6 rounded-lg max-w-xl w-full mx-auto">
      <Tabs defaultValue="tab1">
        <TabsList className="bg-transparent">
          <TabsTrigger value="tab1" variant="darkTab">
            큰 탭 1
          </TabsTrigger>
          <TabsTrigger value="tab2" variant="darkTab">
            큰 탭 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="text-white">
          스타일 적용된 탭 1 내용
        </TabsContent>
        <TabsContent value="tab2" className="text-white">
          스타일 적용된 탭 2 내용
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'darkTab variant를 사용한 탭 스타일 예시입니다.',
      },
    },
  },
};

// ✅ AllSize: size에 따른 탭 스타일 비교
export const AllSizes: Story = {
  name: 'Trigger 사이즈 비교',
  render: () => (
    <div className="bg-black p-6 rounded-lg max-w-xl w-full mx-auto">
      <div className="flex flex-col gap-6">
        {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
          <div key={size} className="w-full">
            <p className="mb-2 text-sm font-medium text-white">size={size}</p>
            <Tabs defaultValue="tab1">
              <TabsList className={`bg-transparent ${size === 'full' ? 'w-full' : ''}`}>
                <TabsTrigger value="tab1" size={size} variant="darkTab">
                  탭 1
                </TabsTrigger>
                <TabsTrigger value="tab2" size={size} variant="darkTab">
                  탭 2
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-white">
                사이즈: {size}
              </TabsContent>
              <TabsContent value="tab2" className="text-white">
                사이즈: {size}
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`TabsTrigger`의 `size` 프롭을 통해 다양한 크기를 비교합니다.',
      },
    },
  },
};
