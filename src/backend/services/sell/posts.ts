import { apiRequest } from '@/backend/client/axios';

import {
  SellDataRequest,
  SellDataResponse,
  UpdateSellDataRequest,
  PostDetailResponse,
  GetPostsResponse,
} from '../../types/sell';

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

  // 게시물 상세 조회
  async getPostDetail(postId: number): Promise<PostDetailResponse> {
    const response = await apiRequest.get<PostDetailResponse>(`/v1/posts/${postId}`);
    return response.data;
  },

  // 거래 게시물 목록 조회 (무한스크롤)
  async getPosts(params?: {
    carrier?: string;
    maxTotalZet?: number;
    minTotalZet?: number;
    maxCapacity?: number;
    minCapacity?: number;
    reputation?: string;
    cursorId?: number;
    size?: number;
  }): Promise<GetPostsResponse> {
    const response = await apiRequest.get<GetPostsResponse>('/v1/posts', { params });
    return response.data;
  },
};
