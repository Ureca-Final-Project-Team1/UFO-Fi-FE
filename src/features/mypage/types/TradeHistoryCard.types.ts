import { BadgeState } from '@/shared';

export interface TradeHistoryCardProps {
  carrier: string;
  message: string;
  state?: BadgeState | undefined;
  dataAmount?: number;
  price: number;
}
