import axiosInstance from '../axios';
import { SignupWithPlanRequest, SignupWithPlanResponse } from './types/SignupWithPlanTypes';

export const signupWithPlan = async (
  requestData: SignupWithPlanRequest,
): Promise<SignupWithPlanResponse | undefined> => {
  try {
    const response = await axiosInstance.post<SignupWithPlanResponse>('/v1/signup', requestData);

    return response.data;
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return;
  }
};
