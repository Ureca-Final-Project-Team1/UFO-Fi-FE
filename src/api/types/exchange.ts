export const CARRIERS = ['SKT', 'KT', 'LGU'] as const;
export const EXCHANGE_STATUSES = ['SELLING', 'SOLD_OUT', 'REPORTED', 'EXPIRED', 'DELETED'] as const;
export const MOBILE_DATA_TYPES = ['LTE', '_5G'] as const;

export type Carrier = (typeof CARRIERS)[number];
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
}

export interface ExchangeCursor {
  createdAt: string;
  cursorId: number;
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
  maxPrice: number;
  purchaseType: 'CAPACITY' | 'BUDGET';
}
