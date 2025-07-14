import { BadgeState } from '../Badge/Badge.types';

export interface TradeHistoryCardProps {
  carrier: string;
  message: string;
  state?: BadgeState;
  dataAmount: number;
  price: number;
}
