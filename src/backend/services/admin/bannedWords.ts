import { apiRequest } from '@/backend/client/axios';
import {
  BannedWordsResponse,
  CreateBannedWordRequest,
  CreateBannedWordResponse,
  DeleteBannedWordsRequest,
  DeleteBannedWordsResponse,
  DeleteSingleBannedWordResponse,
} from '@/backend/types/bannedWords';

export const bannedWordsAPI = {
  // 금칙어 전체 조회 (페이지네이션)
  async getAll(params?: { page?: number; size?: number }): Promise<BannedWordsResponse> {
    const response = await apiRequest.get<BannedWordsResponse>('/admin/banned-words', {
      params: {
        page: params?.page || 1,
        size: params?.size || 10,
      },
    });
    return response.data;
  },

  // 금칙어 등록
  async create(data: CreateBannedWordRequest): Promise<CreateBannedWordResponse> {
    const response = await apiRequest.post<CreateBannedWordResponse>('/admin/banned-word', data);
    return response.data;
  },

  // 금칙어 일괄 삭제
  async deleteMany(data: DeleteBannedWordsRequest): Promise<DeleteBannedWordsResponse> {
    const response = await apiRequest.delete<DeleteBannedWordsResponse>('/admin/banned-words', {
      data,
    });
    return response.data;
  },

  // 금칙어 단일 삭제
  async deleteOne(bannedWordId: number): Promise<DeleteSingleBannedWordResponse> {
    const response = await apiRequest.delete<DeleteSingleBannedWordResponse>(
      `/admin/banned-words/${bannedWordId}`,
    );
    return response.data;
  },
};
