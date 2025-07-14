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
          {/* 온라인 상태 표시 */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
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
            type === 'following' || (type === 'follower' && isFollowing)
              ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
              : 'bg-white text-black border-white hover:bg-gray-200'
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
            className="w-8 h-8 p-0 rounded-full hover:bg-red-500 transition-colors flex items-center justify-center"
          >
            <Icon name="X" size={16} className="text-red-400 hover:text-red-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
