import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { bannedWordsAPI } from '@/api/services/admin/bannedWords';
import { BannedWord } from '@/api/types/bannedWords';

interface UseBannedWordsReturn {
  bannedWords: BannedWord[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  selectedIds: (string | number)[];
  // Actions
  fetchBannedWords: (page?: number, size?: number) => Promise<void>;
  createBannedWord: (word: string) => Promise<void>;
  deleteBannedWords: (ids: (string | number)[]) => Promise<void>;
  deleteSingleBannedWord: (id: string | number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSelectedIds: (ids: (string | number)[]) => void;
  toggleSelectId: (id: string | number) => void;
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
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

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

  // 공통 후처리 핸들러
  const handleAfterMutation = useCallback(
    async (successMessage: string, additionalActions?: () => void) => {
      toast.success(successMessage);
      if (additionalActions) {
        additionalActions();
      }
      // 현재 페이지 새로고침
      await fetchBannedWords(currentPage, pageSize);
    },
    [currentPage, pageSize, fetchBannedWords],
  );

  // 금칙어 등록
  const createBannedWord = useCallback(
    async (word: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await bannedWordsAPI.create({ banWord: word });

        if (response.statusCode === 200) {
          await handleAfterMutation('금칙어가 등록되었습니다.');
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
    [handleAfterMutation],
  );

  // 금칙어 일괄 삭제
  const deleteBannedWords = useCallback(
    async (ids: (string | number)[]) => {
      try {
        setIsLoading(true);
        setError(null);

        // string | number 배열을 number 배열로 변환
        const numberIds = ids.map((id) => (typeof id === 'string' ? parseInt(id, 10) : id));
        const response = await bannedWordsAPI.deleteMany({ ids: numberIds });

        if (response.statusCode === 200) {
          await handleAfterMutation(
            `${response.content.deletedCount}개의 금칙어가 삭제되었습니다.`,
            () => setSelectedIds([]),
          );
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
    [handleAfterMutation],
  );

  // 금칙어 단일 삭제
  const deleteSingleBannedWord = useCallback(
    async (id: string | number) => {
      try {
        setIsLoading(true);
        setError(null);

        const numberId = typeof id === 'string' ? parseInt(id, 10) : id;
        const response = await bannedWordsAPI.deleteOne(numberId);

        if (response.statusCode === 200) {
          await handleAfterMutation('금칙어가 삭제되었습니다.', () =>
            setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id)),
          );
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
    [handleAfterMutation],
  );

  // 선택 관련 함수들
  const toggleSelectId = useCallback((id: string | number) => {
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
      setCurrentPage(1);
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
