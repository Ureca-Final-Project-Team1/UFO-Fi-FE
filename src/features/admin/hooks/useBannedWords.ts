import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { bannedWordsAPI, type BannedWord } from '@/api/services/admin/bannedWords';

interface UseBannedWordsReturn {
  bannedWords: BannedWord[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  selectedIds: number[];
  // Actions
  fetchBannedWords: (page?: number, size?: number) => Promise<void>;
  createBannedWord: (word: string) => Promise<void>;
  deleteBannedWords: (ids: number[]) => Promise<void>;
  deleteSingleBannedWord: (id: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSelectedIds: (ids: number[]) => void;
  toggleSelectId: (id: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
}

export function useBannedWords(): UseBannedWordsReturn {
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 금칙어 목록 조회
  const fetchBannedWords = useCallback(
    async (page: number = currentPage, size: number = pageSize) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await bannedWordsAPI.getAll({ page, size });

        if (response.statusCode === 200) {
          setBannedWords(response.content.content);
          setTotalPages(response.content.totalPages);
          setTotalElements(response.content.totalElements);
          setCurrentPage(page);
        } else {
          throw new Error(response.message || '금칙어 목록을 불러오는데 실패했습니다.');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '금칙어 목록을 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize],
  );

  // 금칙어 등록
  const createBannedWord = useCallback(
    async (word: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await bannedWordsAPI.create({ banWord: word });

        if (response.statusCode === 200) {
          toast.success('금칙어가 등록되었습니다.');
          // 현재 페이지 새로고침
          await fetchBannedWords(currentPage, pageSize);
        } else {
          throw new Error(response.message || '금칙어 등록에 실패했습니다.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '금칙어 등록에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize, fetchBannedWords],
  );

  // 금칙어 일괄 삭제
  const deleteBannedWords = useCallback(
    async (ids: number[]) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await bannedWordsAPI.deleteMany({ ids });

        if (response.statusCode === 200) {
          toast.success(`${response.content.deletedCount}개의 금칙어가 삭제되었습니다.`);
          setSelectedIds([]);
          // 현재 페이지 새로고침
          await fetchBannedWords(currentPage, pageSize);
        } else {
          throw new Error(response.message || '금칙어 삭제에 실패했습니다.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '금칙어 삭제에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize, fetchBannedWords],
  );

  // 금칙어 단일 삭제
  const deleteSingleBannedWord = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await bannedWordsAPI.deleteOne(id);

        if (response.statusCode === 200) {
          toast.success('금칙어가 삭제되었습니다.');
          setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
          // 현재 페이지 새로고침
          await fetchBannedWords(currentPage, pageSize);
        } else {
          throw new Error(response.message || '금칙어 삭제에 실패했습니다.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '금칙어 삭제에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize, fetchBannedWords],
  );

  const toggleSelectId = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id],
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(bannedWords.map((word) => word.id));
  }, [bannedWords]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleSetCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchBannedWords(page, pageSize);
    },
    [pageSize, fetchBannedWords],
  );

  const handleSetPageSize = useCallback(
    (size: number) => {
      setPageSize(size);
      setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로
      fetchBannedWords(1, size);
    },
    [fetchBannedWords],
  );

  useEffect(() => {
    fetchBannedWords(1, pageSize);
  }, []); // 의존성 배열을 비워두어 초기 로드만 실행

  return {
    bannedWords,
    totalPages,
    totalElements,
    currentPage,
    pageSize,
    isLoading,
    error,
    selectedIds,
    fetchBannedWords,
    createBannedWord,
    deleteBannedWords,
    deleteSingleBannedWord,
    setCurrentPage: handleSetCurrentPage,
    setPageSize: handleSetPageSize,
    setSelectedIds,
    toggleSelectId,
    selectAll,
    clearSelection,
  };
}
