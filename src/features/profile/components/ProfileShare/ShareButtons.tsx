'use client';

import { Button, Icon } from '@/shared';

interface ShareButtonsProps {
  onCopyLink: () => void;
  onKakaoShare: () => void;
  onClose: () => void;
}

export function ShareButtons({ onCopyLink, onKakaoShare }: ShareButtonsProps) {
  return (
    <div className="space-y-3">
      {/* 공유 옵션들 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onKakaoShare}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">k</span>
          </div>
          <span className="text-sm text-gray-600">카카오톡</span>
        </button>

        <button
          onClick={onCopyLink}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <Icon name="Link" className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm text-gray-600">링크복사</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
            <Icon name="MoreHorizontal" className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm text-gray-600">더보기</span>
        </button>
      </div>

      <Button variant="secondary" className="w-full" onClick={onCopyLink}>
        <Icon name="Upload" className="w-4 h-4 mr-2" />
        공유 링크 복사하기
      </Button>
    </div>
  );
}
