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

export interface Plan {
  planId: number;
  planName: string;
  carrier: 'SKT' | 'KT' | 'LGU';
  mobileDataAmount: number;
  isUltimatedAmount: boolean;
  sellMobileDataCapacityGB: number;
  mobileDataType: 'LTE' | '5G';
}

export interface PlansResponse {
  statusCode: number;
  message: string;
  content: {
    plansReadRes: Plan[];
  };
}
