export interface ExchangePost {
  postId: number;
  title: string;
  totalPrice: number;
  sellMobileDataCapacityGb: number;
  carrier: 'SKT' | 'KT' | 'LGU';
  status: 'SELLING' | 'SOLD_OUT' | 'REPORTED' | 'EXPIRED' | 'DELETED';
  createdAt: string;
  pricePerUnit: number;
  mobileDataType: 'LTE' | '_5G';
}

export interface ExchangeCursor {
  createdAt: string;
  id: number;
}

export interface GetExchangePostsRequest {
  carrier?: 'SKT' | 'KT' | 'LGU';
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
