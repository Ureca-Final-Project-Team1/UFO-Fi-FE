'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { notificationAPI } from '@/api';
import { TitleWithRouter } from '@/features/common/components/TitleWithRouter';
import { Switch } from '@/shared/ui/Switch';
import '@/styles/globals.css';

type NotificationKey =
  | 'BENEFIT'
  | 'SELL'
  | 'INTERESTED_POST'
  | 'FOLLOWER_POST'
  | 'REPORTED'
  | 'TRADE';

const tradeKeys: NotificationKey[] = ['SELL', 'INTERESTED_POST', 'FOLLOWER_POST', 'REPORTED'];

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

        if (!response) return;

        setNotificationState({
          BENEFIT: response.benefit ?? false,
          SELL: response.sell ?? false,
          INTERESTED_POST: response.interestedPost ?? false,
          FOLLOWER_POST: response.followerPost ?? false,
          REPORTED: response.reported ?? false,
          // TODO: BE 로직에서는 tradeAll이 자동으로 true에서 false로 변하지 않음
          // TODO: TRADE: response.tradeAll ?? false로 추후 변경
          TRADE:
            response.sell && response.interestedPost && response.followerPost && response.reported,
        });
      } catch (err) {
        console.log('알림 설정 불러오기 오류: ', err);
        toast.error('알림 설정을 불러올 수 없습니다.');
      }
    };

    fetchNotificationSettings();
  }, []);

  const handleToggle = async (type: NotificationKey, value: boolean) => {
    const newNotificationState = { ...notificationState, [type]: value };
    try {
      await notificationAPI.updateSetting({
        type,
        enable: value,
      });

      if (type === 'TRADE') {
        tradeKeys.forEach((key) => {
          newNotificationState[key] = value;
        });
      } else if (tradeKeys.includes(type)) {
        newNotificationState.TRADE = false;
      }
      setNotificationState(newNotificationState);
    } catch (err) {
      console.log('알림 설정 변경 실패: ', err);
      toast.error('알림 설정을 변경할 수 없습니다.');
    }
  };

  return (
    <div className="body-16-semibold w-full h-full flex flex-col items-center pt-4 px-4 gap-4 text-white">
      <TitleWithRouter title="알림 설정하기" iconVariant="back" />

      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="grid grid-cols-[80px_1fr_auto] gap-y-4 items-center">
          <p className="col-span-2">이벤트 혜택 수신 알림</p>
          <Switch
            className="col-start-3"
            checked={notificationState.BENEFIT}
            onCheckedChange={(val) => handleToggle('BENEFIT', val)}
          />
        </div>

        <div className="grid grid-cols-[80px_1fr_auto] gap-y-4 items-center">
          <p className="col-span-2">거래 알림 전체</p>
          <Switch
            className="col-start-3"
            checked={notificationState.TRADE}
            onCheckedChange={(val) => handleToggle('TRADE', val)}
          />

          <p className="text-gray-400">데이터</p>
          <p className="ml-[20%]">데이터 판매 알림</p>
          <Switch
            checked={notificationState.SELL}
            onCheckedChange={(val) => handleToggle('SELL', val)}
          />

          <p className="col-start-2 ml-[20%]">관심 상품 알림</p>
          <Switch
            checked={notificationState.INTERESTED_POST}
            onCheckedChange={(val) => handleToggle('INTERESTED_POST', val)}
          />

          <p className="text-gray-400">신고</p>
          <p className="ml-[20%]">신고 누적 정지 알림</p>
          <Switch
            checked={notificationState.REPORTED}
            onCheckedChange={(val) => handleToggle('REPORTED', val)}
          />

          <p className="text-gray-400">팔로우</p>
          <p className="ml-[20%]">새 상품 알림</p>
          <Switch
            checked={notificationState.FOLLOWER_POST}
            onCheckedChange={(val) => handleToggle('FOLLOWER_POST', val)}
          />
        </div>
      </div>
    </div>
  );
};

export default MypageNotificationPage;
