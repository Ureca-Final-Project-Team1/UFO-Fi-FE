import { MobileDataType } from './mobileData';

interface BaseHistoryResponse {
  postId: number;
  createdAt: string;
  carrier: string;
  title: string;
  totalZet: number;
  mobileDataType: MobileDataType;
}

export interface PurchaseHistoryResponse extends BaseHistoryResponse {
  purchaseHistoryId: number;
  totalGB: number;
}

export interface SellHistoryResponse extends BaseHistoryResponse {
  status: string;
  sellMobileDataAmountGB: number;
}
