'use client';

import { useState } from 'react';

import SignalTabContent from '@/features/signal/components/SignalTabContent';
import { Title } from '@/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared';

type TabType = 'orbit' | 'letters';

export default function SignalPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orbit');

  return (
    <div className="flex flex-col min-h-full w-full">
      <Title title="전파 거리" />

      {/* Tabs UI */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
        <TabsList className="p-1 mb-6 mx-4 w-auto">
          <TabsTrigger value="orbit" variant="darkTab" size="full">
            전파 궤도
          </TabsTrigger>
          <TabsTrigger value="letters" variant="darkTab" size="full">
            편지함
          </TabsTrigger>
        </TabsList>

        {/* 탭 콘텐츠 */}
        <div className="flex-1">
          <TabsContent value="orbit">
            <SignalTabContent />
          </TabsContent>

          <TabsContent value="letters">편지함</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
