import type { SuccessApiResponse } from './api';

// 판매 게시물 생성 요청
export interface SellDataRequest {
  title: string;
  zetPerUnit: number;
  sellDataAmount: number;
}

// 판매 게시물 수정 요청
export interface UpdateSellDataRequest {
  title: string;
  zetPerUnit: number;
  sellMobileDataCapacityGb: number;
}

// 판매 게시물 응답
export interface SellDataContent {
  id: number;
}

export type SellDataResponse = SuccessApiResponse<SellDataContent>;

// 거래 게시물 조회
export interface ExchangeItem {
  id: number;
  title: string;
  carrier: string;
  networkType: string;
  sellMobileDataAmountGb: number;
  zetPerUnit: number;
  totalZet: number;
  status: string;
  createdAt: string;
  userId: number;
  isOwner: boolean;
}
