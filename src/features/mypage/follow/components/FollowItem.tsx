import Image from 'next/image';

import { Button } from '@/shared/ui';
import { Icon } from '@/shared/ui/Icons';

interface FollowItemProps {
  userId: string;
  profileImage: string;
  isFollowing: boolean;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onDelete?: (userId: string) => void;
  type: 'follower' | 'following';
}

export default function FollowItem({
  userId,
  profileImage,
  isFollowing,
  onFollow,
  onUnfollow,
  onDelete,
  type,
}: FollowItemProps) {
  const getButtonText = () => {
    if (type === 'follower') {
      return isFollowing ? '맞팔로우' : '팔로우';
    } else {
      return '언팔로우';
    }
  };

  const handleButtonClick = () => {
    if (type === 'follower') {
      if (isFollowing) {
        onUnfollow(userId);
      } else {
        onFollow(userId);
      }
    } else {
      onUnfollow(userId);
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
          variant="outline"
          size="sm"
          onClick={handleButtonClick}
          className={`px-4 py-2 rounded-lg caption-12-bold transition-colors ${
            type === 'follower'
              ? isFollowing
                ? 'bg-white text-black border-white hover:bg-gray-200' // 맞팔로우 중이면 하얀버튼
                : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' // 팔로우 버튼은 파란색
              : 'bg-white text-red-600 border-white hover:bg-gray-200' // 언팔로우는 글씨를 연한 빨간색
          }`}
        >
          {getButtonText()}
        </Button>

        {type === 'follower' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (onDelete) {
                onDelete(userId);
              }
            }}
            className="w-8 h-8 p-0 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Icon name="X" size={16} className="text-gray-400 hover:text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
