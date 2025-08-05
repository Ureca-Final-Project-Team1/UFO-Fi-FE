import { apiRequest } from '@/backend/client/axios';
import type { SignupRequest, SignupResponse } from '@/backend/types/auth';

export const signupAPI = {
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await apiRequest.post<SignupResponse>('/user-plan', data);
    return response.data;
  },
};
