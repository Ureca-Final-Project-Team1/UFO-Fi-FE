// import { apiRequest } from '@/api/client/axios';
// import type { GetProfileResponse } from '@/api/types/profile';

// export const profileAPI = {
//   async getProfile(anotherUserId: number): Promise<GetProfileResponse> {
//     const response = await apiRequest.get<GetProfileResponse>(`/v1/profile/${anotherUserId}`);
//     return response.data;
//   },
// };

import { apiRequest } from '@/api/client/axios';
import type { GetProfileResponse } from '@/api/types/profile';

export const profileAPI = {
  async getProfile(anotherUserId: number): Promise<GetProfileResponse> {
    if (!anotherUserId || anotherUserId <= 0 || !Number.isInteger(anotherUserId)) {
      throw new Error('유효하지 않은 사용자 ID입니다.');
    }
    // TODO: 백엔드 API 엔드포인트 이슈 해결 시 수정
    const url = `/v1/profile/{anotherUserId}?anotherUserId=${anotherUserId}`;
    const response = await apiRequest.get<GetProfileResponse>(url);
    return response.data;
  },
};
