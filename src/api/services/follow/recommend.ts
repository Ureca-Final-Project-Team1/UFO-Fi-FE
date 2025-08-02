import { nextApiRequest } from '@/api/client/axios';
import { FindRecommendUsersResponse } from '@/api/types';

export const recommendAPI = {
  // Qdrant 컬렉션 생성 및 시딩 (POST)
  async updateQdrantCollection(): Promise<{ success: boolean }> {
    const response = await nextApiRequest.post<{ success: boolean }>('/api/collections');
    return response.data;
  },

  // 유사 사용자 추천 (GET)
  async findRecommendUsers(): Promise<FindRecommendUsersResponse[]> {
    const response = await nextApiRequest.get<{ neighbors: FindRecommendUsersResponse[] }>(
      '/api/collections/search',
    );
    return response.data.neighbors;
  },
};
