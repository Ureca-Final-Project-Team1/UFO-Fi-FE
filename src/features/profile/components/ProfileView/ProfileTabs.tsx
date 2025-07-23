'use client';

import { useState } from 'react';

import type { ProfileUser } from '@/api/types/profile';

import { TradeData } from './TradeData';

interface ProfileTabsProps {
  profile: ProfileUser;
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<'trade' | 'achievements'>('trade');

  return (
    <div className="space-y-4">
      {/* 탭 헤더 */}
      <div className="flex">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'trade' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('trade')}
        >
          거래 현황
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'achievements'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          보유 업적
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[200px]">
        {activeTab === 'trade' && <TradeData profile={profile} />}
        {activeTab === 'achievements' && (
          <div className="text-center text-gray-400 py-8">보유한 업적이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
