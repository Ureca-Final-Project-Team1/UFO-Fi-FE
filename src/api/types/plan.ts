import { Carrier } from './carrier';
import { MobileDataType } from './mobileData';

export interface Plan {
  planId: number;
  planName: string;
  carrier: Carrier;
  mobileDataAmount: number;
  isUltimatedAmount: boolean;
  sellMobileDataCapacityGB: number;
  mobileDataType: MobileDataType;
}
