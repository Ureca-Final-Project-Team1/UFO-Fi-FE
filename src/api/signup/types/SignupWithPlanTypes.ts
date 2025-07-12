export interface SignupWithPlanResponse {
  statusCode: number;
  message: string;
  content?: {
    nickname: string;
    profilePhotoURL: string;
    role: string;
  };
}

export interface SignupWithPlanRequest {
  name: string;
  phoneNumber: string;
  // TODO: DB 리팩토링 후 planId로 변경할 것
  planName: string | null;
  // planId: number;
  // TODO: DB 리팩토링 후 제거할 것
  carrier: string | null;
  mobileDataAmount: number | null;
  isUltimatedAmount: boolean | null;
  sellMobileDataCapacityGB: number | null;
  mobileDataType: string;
  // TODO: 인증 처리 후 제거할 것
  userId: number;
}
