export interface BulkResultData {
  searchId: string;
  capacity: number;
  budget: number;
  matchedData: number;
  expectedAmount: number;
  shortfall: number;
  dataList: BulkResultItem[];
  expiresAt: number;
}

export interface BulkResultItem {
  carrier: 'KT' | 'SKT' | 'LGU';
  message: string;
  dataAmount: number;
  price: number;
  seller: string;
  timeAgo: string;
}
