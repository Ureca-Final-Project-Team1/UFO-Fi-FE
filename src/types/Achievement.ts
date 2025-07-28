export interface Achievement {
  id: number;
  level: number;
  type: 'trade' | 'rotate' | 'follow';
  name: string;
  description: string;
  condition_value: number;
}

export type SelectedAchievementState = {
  achievement: Achievement;
  i: number;
  j: number;
  isAchieve: boolean;
};
