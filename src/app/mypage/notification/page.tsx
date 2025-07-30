'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { notificationAPI } from '@/api';
import { Title } from '@/shared';
import type { NotificationType } from '@/shared/ui/NotificationDropdown/NotificationDropdown.types';
import { Switch } from '@/shared/ui/Switch/Switch';

const MypageNotificationPage = () => {
  const [notificationState, setNotificationState] = useState({
    BENEFIT: false,
    SELL: false,
    INTERESTED_POST: false,
    FOLLOWER_POST: false,
    REPORTED: false,
    TRADE: false,
  });

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await notificationAPI.getSettings();
        if (response) {
          setNotificationState({
            BENEFIT: response.benefit ?? false,
            SELL: response.sell ?? false,
            INTERESTED_POST: response.interestedPost ?? false,
            FOLLOWER_POST: response.followerPost ?? false,
            REPORTED: response.reported ?? false,
            TRADE: response.tradeAll ?? false,
          });
        }
      } catch (err) {
        console.warn('알림 설정 불러오기 오류: ', err);
        toast.error('알림 설정을 불러올 수 없습니다.');
      }
    };
    fetchNotificationSettings();
  }, []);

  const handleToggle = async (type: NotificationType, value: boolean) => {
    try {
      await notificationAPI.updateSetting({
        type,
        enable: value,
      });
      setNotificationState((prev) => ({
        ...prev,
        [type]: value,
      }));
      toast.success('알림 설정이 변경되었습니다.');
    } catch (err) {
      console.warn('알림 설정 변경 실패: ', err);
      toast.error('알림 설정을 변경할 수 없습니다.');
    }
  };

  return (
    <div className="body-16-semibold w-full h-full flex flex-col items-center pt-4 gap-4 text-white">
      <Title title="알림 설정하기" iconVariant="back" />

      <div className="w-full flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">이벤트 혜택 수신 알림</h3>
              <p className="text-white/60 text-sm">이벤트 및 혜택 관련 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.BENEFIT}
              onCheckedChange={(checked) => handleToggle('BENEFIT', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">데이터 판매 알림</h3>
              <p className="text-white/60 text-sm">내 데이터가 판매될 때 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.SELL}
              onCheckedChange={(checked) => handleToggle('SELL', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">관심 상품 알림</h3>
              <p className="text-white/60 text-sm">관심 상품 관련 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.INTERESTED_POST}
              onCheckedChange={(checked) => handleToggle('INTERESTED_POST', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">신고 누적 정지 알림</h3>
              <p className="text-white/60 text-sm">신고 관련 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.REPORTED}
              onCheckedChange={(checked) => handleToggle('REPORTED', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">새 상품 알림</h3>
              <p className="text-white/60 text-sm">팔로우한 사용자의 새 상품 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.FOLLOWER_POST}
              onCheckedChange={(checked) => handleToggle('FOLLOWER_POST', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">거래 알림 전체</h3>
              <p className="text-white/60 text-sm">모든 거래 관련 알림을 받습니다</p>
            </div>
            <Switch
              checked={notificationState.TRADE}
              onCheckedChange={(checked) => handleToggle('TRADE', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageNotificationPage;
