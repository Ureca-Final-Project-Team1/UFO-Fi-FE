import type { SuccessApiResponse } from '@/backend';

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
  postId: number;
  title: string;
  carrier: string;
  mobileDataType: string;
  sellMobileDataCapacityGb: number;
  pricePerUnit: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  sellerId: number;
  sellerNickname: string;
  sellerProfileUrl: string;
}

// 게시물 상세 조회 응답
export type PostDetailResponse = SuccessApiResponse<ExchangeItem>;

// 무한스크롤용 커서
export interface NextCursor {
  createdAt: string;
  id: number;
}

// 게시물 목록 조회 응답
export interface GetPostsContent {
  posts: ExchangeItem[];
  nextCursor: NextCursor;
}

export type GetPostsResponse = SuccessApiResponse<GetPostsContent>;
