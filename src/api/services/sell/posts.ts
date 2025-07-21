import { apiRequest } from '@/api/client/axios';
import type {
  SellDataRequest,
  SellDataResponse,
  UpdateSellDataRequest,
  ExchangeItem,
} from '@/api/types/sell';

export const sellAPI = {
  // 판매 게시물 생성
  async createPost(data: SellDataRequest): Promise<SellDataResponse> {
    const response = await apiRequest.post<SellDataResponse>('/v1/posts', data);
    return response.data;
  },

  // 판매 게시물 수정
  async updatePost(postId: number, data: UpdateSellDataRequest): Promise<SellDataResponse> {
    const response = await apiRequest.put<SellDataResponse>(`/v1/posts/${postId}`, data);
    return response.data;
  },

  // 판매 게시물 삭제
  async deletePost(postId: number): Promise<SellDataResponse> {
    const response = await apiRequest.delete<SellDataResponse>(`/v1/posts/${postId}`);
    return response.data;
  },

  // 거래 게시물 현재 목록 조회
  async getPosts(params?: {
    page?: number;
    size?: number;
    carrier?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ExchangeItem[]> {
    const response = await apiRequest.get<{
      statusCode: number;
      message: string;
      content: ExchangeItem[];
    }>('/v1/posts', { params });
    return response.data.content;
  },
};
