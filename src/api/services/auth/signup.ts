import { apiRequest, type SignupRequest, type SignupResponse } from '@/api';

export const signupAPI = {
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await apiRequest.post<SignupResponse>('/v1/signup', data);
    return response.data;
  },
};
