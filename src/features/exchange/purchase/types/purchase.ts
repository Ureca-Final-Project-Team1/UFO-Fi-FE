export interface PostData {
  title: string;
  zetPerUnit: number;
  capacity: number;
  carrier: string;
}

export interface ExchangeItemAction {
  onEdit: (id: number, postData: PostData) => void;
  onDelete: (id: number) => void;
  onReport: (id: number) => void;
  onPurchase: (id: number) => void;
}

export interface TransformedExchangeItem {
  id: number;
  carrier: string;
  networkType: string;
  capacity: string;
  price: string;
  timeLeft: string;
  isOwner: boolean;
  status: string;
}
