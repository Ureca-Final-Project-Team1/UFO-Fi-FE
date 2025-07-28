import { Carrier } from '@/api/types/carrier';
import { MobileDataType } from '@/api/types/mobileData';

export interface BulkResultData {
  statusCode: number;
  message: string;
  content: BulkResultContentItem;
}

export interface BulkResultContentItem {
  totalGb: number;
  totalPrice: number;
  posts: BulkResultItem[];
}

export interface BulkResultItem {
  postId: number;
  title: string;
  totalPrice: number;
  sellMobileDataCapacityGb: number;
  carrier: Carrier;
  status: string;
  createdAt: Date;
  pricePerUnit: number;
  mobileDataType: MobileDataType;
  sellerNickname: string;
  sellerId: number;
}
