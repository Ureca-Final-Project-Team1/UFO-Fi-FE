export interface PurchaseHistoryResponse {
  postId: number;
  purchaseHistoryId: number;
  createdAt: Date;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}

export interface SellHistoryResponse {
  postId: number;
  status: string;
  createdAt: Date;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}
