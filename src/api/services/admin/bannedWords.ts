import { apiRequest } from '@/api/client/axios';
import {
  BannedWordsResponse,
  CreateBannedWordRequest,
  CreateBannedWordResponse,
  DeleteBannedWordsRequest,
  DeleteBannedWordsResponse,
  DeleteSingleBannedWordResponse,
} from '@/api/types/bannedWords';

export const bannedWordsAPI = {
  // 금칙어 전체 조회 (페이지네이션)
  async getAll(params?: { page?: number; size?: number }): Promise<BannedWordsResponse> {
    const response = await apiRequest.get<BannedWordsResponse>('/v1/admin/bannedword', {
      params: {
        page: params?.page || 1,
        size: params?.size || 10,
      },
    });
    return response.data;
  },

  // 금칙어 등록
  async create(data: CreateBannedWordRequest): Promise<CreateBannedWordResponse> {
    const response = await apiRequest.post<CreateBannedWordResponse>('/v1/admin/bannedword', data);
    return response.data;
  },

  // 금칙어 일괄 삭제
  async deleteMany(data: DeleteBannedWordsRequest): Promise<DeleteBannedWordsResponse> {
    const response = await apiRequest.delete<DeleteBannedWordsResponse>('/v1/admin/bannedword', {
      data,
    });
    return response.data;
  },

  // 금칙어 단일 삭제
  async deleteOne(banwordId: number): Promise<DeleteSingleBannedWordResponse> {
    const response = await apiRequest.delete<DeleteSingleBannedWordResponse>(
      `/v1/admin/bannedword/${banwordId}`,
    );
    return response.data;
  },
};
