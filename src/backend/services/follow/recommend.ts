import { nextApiRequest } from '@/backend/client/axios';
import { FindRecommendUsersResponse, FindRecommendUsersResponseContent } from '@/backend/types';
import { API_ENDPOINTS } from '@/constants';

export const recommendAPI = {
  // Qdrant 컬렉션 생성 및 시딩 (POST)
  async updateQdrantCollection(): Promise<{ success: boolean }> {
    const response = await nextApiRequest.post<{ success: boolean }>(
      API_ENDPOINTS.COLLECTIONS.CREATE,
    );
    return response.data;
  },

  // 유사 사용자 추천 (GET)
  async findRecommendUsers(): Promise<FindRecommendUsersResponseContent[]> {
    const response = await nextApiRequest.get<FindRecommendUsersResponse>(
      API_ENDPOINTS.COLLECTIONS.SEARCH,
    );
    return response.data.content.neighbors;
  },
};
