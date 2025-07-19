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
  carrier: string;
}

export interface GetPlansResponse {
  statusCode: number;
  message: string;
  content: {
    plansReadRes: Plan[];
  };
}

import type { Plan } from './plan';
