import { Carrier } from './carrier';

export const CARRIERS = Object.values(Carrier);
export const EXCHANGE_STATUSES = ['SELLING', 'SOLD_OUT', 'REPORTED', 'EXPIRED', 'DELETED'] as const;
export const MOBILE_DATA_TYPES = ['LTE', '_5G'] as const;

export type CarrierType = Carrier;
export type ExchangeStatus = (typeof EXCHANGE_STATUSES)[number];
export type MobileDataType = (typeof MOBILE_DATA_TYPES)[number];

export interface ExchangePost {
  postId: number;
  title: string;
  totalPrice: number;
  sellMobileDataCapacityGb: number;
  carrier: Carrier;
  status: ExchangeStatus;
  createdAt: string;
  pricePerUnit: number;
  mobileDataType: MobileDataType;
  sellerNickname: string;
  sellerId: number;
}

export interface ExchangeCursor {
  createdAt: string;
  id: number;
}

export interface GetExchangePostsRequest {
  carrier?: Carrier;
  maxTotalZet?: number;
  minTotalZet?: number;
  maxCapacity?: number;
  minCapacity?: number;
  reputation?: string;
  cursorId?: number;
  size?: number;
}

export interface GetExchangePostsResponse {
  posts: ExchangePost[];
  nextCursor: ExchangeCursor;
}

export interface PurchaseRequest {
  postId: number;
  sellerId: number;
  totalZet: number;
  sellMobileDataAmountGB: number;
}

export interface PurchaseResponse {
  statusCode: number;
  message: string;
  content: {
    zetAsset: number;
  };
}

export interface BulkPurchaseParams {
  desiredGb: number;
  unitPerZet: number;
}

// 구매 상태 관련 타입
export interface PurchaseStatus {
  transactionId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

// 구매 이력 관련 타입
export interface PurchaseTransaction {
  id: string;
  postId: number;
  sellerId: number;
  buyerId: number;
  totalZet: number;
  dataAmountGB: number;
  carrier: Carrier;
  mobileDataType: MobileDataType;
  status: PurchaseStatus['status'];
  createdAt: string;
  completedAt?: string;
}
