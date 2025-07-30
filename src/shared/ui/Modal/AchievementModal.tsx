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
import { getAchievedDate } from '@/utils/getAchievedDate';

import { AchievementModalProps } from './Modal.types';

export default function AchievementModal({ open, onClose, achievement }: AchievementModalProps) {
  if (!achievement) return null;

  const { i, j, isAchieve, achievement: data } = achievement;
  const achievedDate = getAchievedDate(isAchieve, data.achievedAt);
  const conditionText =
    data.type === 'trade' ? '회 거래' : data.type === 'follow' ? '명 팔로워' : '번 항해 완료';
  const levelText = `${isAchieve ? `업적 달성 🎉` : '업적 미달성'}`;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-full max-w-sm mx-auto flex flex-col items-center gap-5 p-6">
        <AchievementBadge
          i={i}
          j={j}
          isAchieve={isAchieve}
          achievementName={data.name}
          showName={false}
          className="mx-auto"
        />
        <DialogHeader className="text-center flex flex-col items-center">
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1 text-sm text-gray-600 text-center whitespace-pre-line">
          <span>
            달성 조건: {data.condition_value.toLocaleString()}
            {conditionText}
          </span>
          {achievedDate && <span>달성일: {achievedDate}</span>}
          <span className="font-semibold">{levelText}</span>
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
