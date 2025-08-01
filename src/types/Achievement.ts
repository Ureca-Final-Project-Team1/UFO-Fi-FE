import type { achievements } from '@prisma/client';

export interface AchievementUpdateResponse {
  message: string;
  trade_level: number;
  follow_level: number;
  rotate_level: number;
  total_level: number;
  achievements: (achievements & { achievedAt: string | null })[];
  newly_achieved_ids: number[];
}

export interface Achievement {
  id: number;
  level: number;
  type: 'trade' | 'rotate' | 'follow';
  name: string;
  description: string;
  condition_value: number;
  achievedAt?: string | null;
}

export type SelectedAchievementState = {
  achievement: Achievement;
  i: number;
  j: number;
  isAchieve: boolean;
};

export interface GetHonorificsResponse {
  honorifics: Honorific[];
}

export interface Honorific {
  id: number;
  name: string;
  level: number;
  isActive: boolean;
}
