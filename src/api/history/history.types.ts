export interface purchaseHistoryRequest {
  userId: number;
}

export interface purchaseHistoryResponse {
  postId: number;
  purchaseHistoryId: number;
  createdAt: Date;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: string;
}

export interface sellHistoryRequest {
  userId: number;
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
