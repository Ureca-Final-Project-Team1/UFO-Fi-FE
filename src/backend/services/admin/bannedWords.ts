import { apiRequest } from '@/backend/client/axios';
import {
  BannedWordsResponse,
  CreateBannedWordRequest,
  CreateBannedWordResponse,
  DeleteBannedWordsRequest,
  DeleteBannedWordsResponse,
  DeleteSingleBannedWordResponse,
} from '@/backend/types/bannedWords';
import { API_ENDPOINTS } from '@/constants';

export const bannedWordsAPI = {
  // 금칙어 전체 조회 (페이지네이션)
  async getAll(params?: { page?: number; size?: number }): Promise<BannedWordsResponse> {
    const response = await apiRequest.get<BannedWordsResponse>(API_ENDPOINTS.BANNED_WORDS.LIST, {
      params: {
        page: params?.page || 0,
        size: params?.size || 10,
      },
    });
    return response.data;
  },

  // 금칙어 등록
  async create(data: CreateBannedWordRequest): Promise<CreateBannedWordResponse> {
    const response = await apiRequest.post<CreateBannedWordResponse>(
      API_ENDPOINTS.BANNED_WORDS.CREATE,
      data,
    );
    return response.data;
  },

  // 금칙어 일괄 삭제
  async deleteMany(data: DeleteBannedWordsRequest): Promise<DeleteBannedWordsResponse> {
    const response = await apiRequest.delete<DeleteBannedWordsResponse>(
      API_ENDPOINTS.BANNED_WORDS.DELETE_BULK,
      {
        data,
      },
    );
    return response.data;
  },

  // 금칙어 단일 삭제
  async deleteOne(banwordId: number): Promise<DeleteSingleBannedWordResponse> {
    const response = await apiRequest.delete<DeleteSingleBannedWordResponse>(
      API_ENDPOINTS.BANNED_WORDS.DELETE_SINGLE(banwordId),
    );
    return response.data;
  },
};
