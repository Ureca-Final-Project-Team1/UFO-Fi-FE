import { Plan } from '@/shared/types/plan';

export interface SignupWithPlanResponse {
  statusCode: number;
  message: string;
  content?: {
    nickname: string;
    profilePhotoUrl: string;
  };
}

export interface SignupWithPlanRequest {
  userInfoReq: {
    name: string;
    phoneNumber: string;
  };
  userPlanReq: {
    planId: number;
    planName: string;
  };
}

export interface PlansResponse {
  statusCode: number;
  message: string;
  content: {
    plansReadRes: Plan[];
  };
}
