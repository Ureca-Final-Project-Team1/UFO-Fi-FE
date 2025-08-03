import { apiRequest } from '@/backend/client/axios';
import { MyInfoResponse } from '@/backend/types/myInfo';

export const myInfoAPI = {
  async get(): Promise<MyInfoResponse['content'] | undefined> {
    try {
      const response = await apiRequest.get<{ content: MyInfoResponse['content'] }>('/v1/mypage');
      return response.data.content;
    } catch (error) {
      console.error('마이페이지 나의 프로필 조회 실패:', error);
    }
  },
};
