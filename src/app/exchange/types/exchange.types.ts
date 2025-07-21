import { Carrier } from '@/api/types/carrier';

export interface ExchangeItemAction {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReport: (id: number) => void;
  onPurchase: (id: number) => void;
}

export interface TransformedExchangeItem {
  id: number;
  carrier: Carrier[];
  networkType: string;
  capacity: string;
  price: string;
  timeLeft: string;
  isOwner: boolean;
  status: string;
}
