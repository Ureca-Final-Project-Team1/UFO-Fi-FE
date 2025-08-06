import { apiRequest } from '@/backend/client/axios';
import type { SignupRequest, SignupResponse } from '@/backend/types/auth';
import { API_ENDPOINTS } from '@/constants';

export const signupAPI = {
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await apiRequest.patch<SignupResponse>(
      API_ENDPOINTS.USER.SIGNUP_USER_INFO,
      data,
    );
    return response.data;
  },
};
