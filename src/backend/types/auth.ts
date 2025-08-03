import { SuccessApiResponse } from './api';
import { Carrier } from './carrier';
import type { Plan } from './plan';

export interface SignupRequest {
  userInfoReq: {
    name: string;
    phoneNumber: string;
  };
  userPlanReq: {
    planId: number;
    planName: string;
  };
}

export interface SignupResponse {
  statusCode: number;
  message: string;
  content?: {
    nickname: string;
    profilePhotoUrl: string;
  };
}

export interface GetPlansRequest {
  carrier: Carrier;
}

export interface GetPlansResponse {
  statusCode: number;
  message: string;
  content: {
    plansReadRes: Plan[];
  };
}

export interface SetLogoutContent {
  statusCode: number;
  message: string;
}

export type SetLogoutResponse = SuccessApiResponse<SetLogoutContent>;
