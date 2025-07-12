import { BadgeState } from '../Badge/Badge.types';

export interface TradeCardProps {
  carrier: string;
  message: string;
  state?: BadgeState;
  dataAmount: number;
  price: number;
}
