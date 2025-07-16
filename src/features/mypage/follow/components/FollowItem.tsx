import Image from 'next/image';

import { Button } from '@/shared/ui';

import {
  FollowItemProps,
  FOLLOW_TYPE,
  FOLLOW_ACTION,
  FollowButtonConfig,
} from '../types/FollowType.types';

export default function FollowItem({ user, actions, type }: FollowItemProps) {
  const { id: userId, profileImage, isFollowing } = user;
  const { onFollow, onUnfollow } = actions;

  const getButtonConfig = (): FollowButtonConfig => {
    if (type === FOLLOW_TYPE.FOLLOWER) {
      return isFollowing
        ? {
            variant: 'following-button',
            text: '맞팔로우',
            action: FOLLOW_ACTION.UNFOLLOW,
          }
        : {
            variant: 'follow-button',
            text: '팔로우',
            action: FOLLOW_ACTION.FOLLOW,
          };
    } else {
      return {
        variant: 'unfollow-button',
        text: '언팔로우',
        action: FOLLOW_ACTION.UNFOLLOW,
      };
    }
  };

  const buttonConfig = getButtonConfig();

  const handleButtonClick = () => {
    switch (buttonConfig.action) {
      case FOLLOW_ACTION.FOLLOW:
        onFollow(userId);
        break;
      case FOLLOW_ACTION.UNFOLLOW:
        onUnfollow(userId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[25rem] flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image src={profileImage} alt="프로필" width={50} height={50} className="rounded-full" />
        </div>
        <div>
          <p className="body-16-bold text-white">지구인 {userId}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={buttonConfig.variant}
          size="follow-sm"
          onClick={handleButtonClick}
          className="caption-12-bold"
          aria-label={`${userId}을 ${buttonConfig.text}하기`}
        >
          {buttonConfig.text}
        </Button>
      </div>
    </div>
  );
}
