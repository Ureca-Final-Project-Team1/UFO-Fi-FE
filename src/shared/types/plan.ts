export interface Plan {
  planName: string | null;
  carrier: string | null;
  isUltimatedAmount: boolean | null;
  mobileDataAmount: number | null;
  mobileDataType: string;
  sellMobileDataCapacityGB: number | null;
}
