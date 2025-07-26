export interface SortOptions {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortOptions;
}

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
    pageable: Pageable;
    sort: SortOptions;
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
