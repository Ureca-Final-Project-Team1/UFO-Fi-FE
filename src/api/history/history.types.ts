export interface purchaseHistoryResponse {
  postId: number;
  purchaseHistoryId: number;
  createdAt: Date;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}

export interface sellHistoryResponse {
  postId: number;
  status: string;
  createdAt: Date;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}
