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
  carrier: 'KT' | 'SKT' | 'LGU';
  status: string;
  createdAt: Date;
  pricePerUnit: number;
  mobileDataType: string;
}
