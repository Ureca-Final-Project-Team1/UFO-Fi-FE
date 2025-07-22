import { Carrier } from './carrier';

export interface Plan {
  planId: number;
  planName: string;
  carrier: Carrier;
  mobileDataAmount: number;
  isUltimatedAmount: boolean;
  sellMobileDataCapacityGB: number;
  mobileDataType: 'LTE' | '_5G';
}
