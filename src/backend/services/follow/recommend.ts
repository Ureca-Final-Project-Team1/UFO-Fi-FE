import { nextApiRequest } from '@/backend/client/axios';
import { FindRecommendUsersResponse, FindRecommendUsersResponseContent } from '@/backend/types';

export const recommendAPI = {
  // Qdrant 컬렉션 생성 및 시딩 (POST)
  async updateQdrantCollection(): Promise<{ success: boolean }> {
    const response = await nextApiRequest.post<{ success: boolean }>('/api/collections');
    return response.data;
  },

  // 유사 사용자 추천 (GET)
  async findRecommendUsers(): Promise<FindRecommendUsersResponseContent[]> {
    const response =
      await nextApiRequest.get<FindRecommendUsersResponse>('/api/collections/search');
    return response.data.content.neighbors;
  },
};
