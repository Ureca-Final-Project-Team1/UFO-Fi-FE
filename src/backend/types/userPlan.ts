import { SuccessApiResponse } from './api';

export interface UserPlanContent {
  planId: number;
  planName: string;
  carrier: string;
  mobileDataType: string;
  sellMobileDataCapacity: number;
}

export type UserPlanResponse = SuccessApiResponse<UserPlanContent>;
