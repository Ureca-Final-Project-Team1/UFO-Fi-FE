import { Carrier } from '@/api/types/carrier';

export interface BulkPurchaseItem {
  postId: number;
  title: string;
  totalPrice: number;
  sellMobileDataCapacityGb: number;
  carrier: Carrier;
  status: string;
  createdAt: Date;
  pricePerUnit: number;
  mobileDataType: string;
  sellerNickname: string;
  sellerId: number;
}

export interface GetBulkPurchaseRequest {
  desiredGb: number;
  unitPerZet: number;
}

export interface GetBulkPurchaseResponse {
  statusCode: number;
  message: string;
  content: GetBulkPurchaseContent;
}

export interface GetBulkPurchaseContent {
  totalGb: number;
  totalPrice: number;
  posts: BulkPurchaseItem[];
}

export interface PostBulkPurchaseResponse {
  statusCode: number;
  message: string;
  content: PostBulkPurchaseContent;
}

export interface PostBulkPurchaseContent {
  successCount: number;
  failureCount: number;
  successPosts: SuccessBulkPurchaseItem[];
  failPosts: FailureBulkPurchaseItem[];
}

export interface SuccessBulkPurchaseItem extends BulkPurchaseItem {
  sellerProfileUrl: string;
}

export interface FailureBulkPurchaseItem extends BulkPurchaseItem {
  sellerProfileUrl: string;
  reason: string;
}
