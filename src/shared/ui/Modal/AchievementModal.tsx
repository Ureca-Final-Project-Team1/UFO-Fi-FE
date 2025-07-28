'use client';

import { AchievementBadge } from '@/features/mypage/components/AchievementBadge';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared';

import { AchievementModalProps } from './Modal.types';

export default function AchievementModal({ open, onClose, achievement }: AchievementModalProps) {
  if (!achievement) return null;

  const { i, j, isAchieve, achievement: data } = achievement;

  const achievedDate = isAchieve
    ? new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-full max-w-sm mx-auto flex flex-col items-center gap-5 p-6">
        {' '}
        <AchievementBadge
          i={i}
          j={j}
          isAchieve={isAchieve}
          achievementName={data.name}
          showName={false}
          className="mx-auto"
        />
        <DialogHeader className="text-center">
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm text-gray-600 whitespace-pre-line text-center">
          달성 조건: {data.condition_value.toLocaleString()}
          {data.type === 'trade'
            ? '회 거래'
            : data.type === 'follow'
              ? '명 팔로워'
              : '번 항해 완료'}
          {achievedDate ? `\n달성일: ${achievedDate}` : ''}
        </div>
        <DialogFooter className="w-full mt-4">
          <Button className="w-full" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
