import { Carrier } from '@/backend/types/carrier';
import { MobileDataType } from '@/backend/types/mobileData';

export interface BulkPurchaseItem {
  postId: number;
  title: string;
  totalPrice: number;
  sellMobileDataCapacityGb: number;
  carrier: Carrier;
  status: string;
  createdAt: string;
  pricePerUnit: number;
  mobileDataType: MobileDataType;
  sellerNickname: string;
  sellerId: number;
  sellerProfileUrl: string;
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
  successPosts: BulkPurchaseItem[];
  failPosts: FailureBulkPurchaseItem[];
}

export interface FailureBulkPurchaseItem extends BulkPurchaseItem {
  reason: string;
}
