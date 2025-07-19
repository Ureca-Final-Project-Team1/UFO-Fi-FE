import { apiRequest } from '@/api/client/axios';
import type { SignupRequest, SignupResponse } from '@/api/types/auth';

export const signupAPI = {
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await apiRequest.post<SignupResponse>('/v1/signup', data);
    return response.data;
  },
};
