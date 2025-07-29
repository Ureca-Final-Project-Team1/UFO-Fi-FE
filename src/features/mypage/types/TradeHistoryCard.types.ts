import { BadgeState } from '@/shared';

export interface TradeHistoryCardProps {
  carrier: string;
  message: string;
  state?: BadgeState;
  dataAmount: number;
  price: number;
  onClick?: () => void;
}
