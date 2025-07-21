interface BaseHistoryResponse {
  postId: number;
  createdAt: string;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}

export interface PurchaseHistoryResponse extends BaseHistoryResponse {
  purchaseHistoryId: number;
}

export interface SellHistoryResponse extends BaseHistoryResponse {
  status: string;
}
