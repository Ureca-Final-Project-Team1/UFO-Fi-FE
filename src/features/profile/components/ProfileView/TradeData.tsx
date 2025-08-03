'use client';

import type { ProfileUser } from '@/api';
import { ICON_PATHS } from '@/constants';
import { Icon } from '@/shared';
import { formatTimeAgo } from '@/shared';

interface TradeDataProps {
  profile: ProfileUser;
}

export function TradeData({ profile }: TradeDataProps) {
  return (
    <div className="space-y-4">
      {/* 판매중인 데이터 */}
      <div className="text-center space-y-2">
        <h3 className="text-white font-semibold">판매중인 데이터</h3>
        {profile.tradePostsRes.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {profile.tradePostsRes.map((post) => (
              <div key={post.postId} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon src={ICON_PATHS[post.carrier]} className="w-4 h-4" />
                    <span className="text-white text-sm font-medium">{post.title}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 text-sm font-bold">
                      {post.sellMobileDataAmountGB}GB
                    </div>
                    <div className="text-gray-400 text-xs">{formatTimeAgo(post.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-4">판매중인 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
