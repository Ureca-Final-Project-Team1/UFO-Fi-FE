export interface Plan {
  planId: number;
  planName: string;
  carrier: 'SKT' | 'KT' | 'LGU';
  mobileDataAmount: number;
  isUltimatedAmount: boolean;
  sellMobileDataCapacityGB: number;
  mobileDataType: 'LTE' | '_5G';
}
