import axiosInstance from '../axios';
import { SignupWithPlanRequest, SignupWithPlanResponse } from '../types/SignupWithPlanTypes';

export const signupWithPlan = async ({
  name,
  phone,
  // TODO: DB 리팩토링 후 planId로 변경할 것
  planName,
  // planId,
  // TODO: DB 리팩토링 후 제거할 것
  carrier,
  mobileDataAmount,
  isUltimatedAmount,
  sellMobileDataCapacityGB,
  mobileDataType,
  // TODO: 인증 처리 후 제거할 것
  userId,
}: SignupWithPlanRequest): Promise<SignupWithPlanResponse | undefined> => {
  try {
    const response = await axiosInstance.post(
      '/signup',
      {
        userInfoReq: {
          name: name,
          phoneNumber: phone,
        },
        userPlanReq: {
          // TODO: DB 리팩토링 후 planId로 변경할 것
          planName,
          // planId: planId
          // TODO: DB 리팩토링 후 제거할 것
          carrier,
          mobileDataAmount,
          isUltimatedAmount,
          sellMobileDataCapacityGB,
          mobileDataType,
        },
      },
      // TODO: 인증 처리 후 제거할 것
      {
        params: { userId },
      },
    );

    return response.data;
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return;
  }
};
