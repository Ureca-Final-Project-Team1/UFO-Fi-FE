import { apiRequest } from '@/api/client/axios';

export interface BannedWord {
  id: number;
  word: string;
}

export interface BannedWordsResponse {
  statusCode: number;
  message: string;
  content: {
    content: BannedWord[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
    pageable: {
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
    };
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
  };
}

export interface CreateBannedWordRequest {
  banWord: string;
}

export interface CreateBannedWordResponse {
  statusCode: number;
  message: string;
  content: BannedWord;
}

export interface DeleteBannedWordsRequest {
  ids: number[];
}

export interface DeleteBannedWordsResponse {
  statusCode: number;
  message: string;
  content: {
    deletedIds: number[];
    deletedCount: number;
  };
}

export interface DeleteSingleBannedWordResponse {
  statusCode: number;
  message: string;
  content: {
    id: number;
  };
}

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
      `/v1/admin/${banwordId}`,
    );
    return response.data;
  },
};
