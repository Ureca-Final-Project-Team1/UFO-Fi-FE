import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { reportAPI } from '@/backend';
import { ReportedUser } from '@/backend/types/report';

interface UseReportedUsersReturn {
  reportedUsers: ReportedUser[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  grantUser: (userId: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const useReportedUsers = (): UseReportedUsersReturn => {
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 신고된 사용자 목록 조회
  const fetchReportedUsers = useCallback(
    async (page = currentPage, size = pageSize) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await reportAPI.getReportedUsers({ page, size });

        const content = response.content.reportedUsersReadRes;

        if (Array.isArray(content)) {
          setReportedUsers(content);
          setTotalElements(content.length);
          setTotalPages(Math.ceil(content.length / size));
        } else {
          setReportedUsers(content.content || []);
          setTotalPages(content.totalPages || 0);
          setTotalElements(content.totalElements || 0);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '사용자 목록을 불러오는 중 오류가 발생했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize],
  );

  // 사용자 비활성화 해제
  const grantUser = useCallback(
    async (userId: number) => {
      try {
        setIsLoading(true);

        await reportAPI.grantUser({ userId });
        toast.success('사용자 활성화가 완료되었습니다.');

        // 목록 새로고침 (페이지네이션 고려)
        await fetchReportedUsers(currentPage, pageSize);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '사용자 활성화 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize, fetchReportedUsers],
  );

  const refreshData = useCallback(async () => {
    await fetchReportedUsers(currentPage, pageSize);
  }, [fetchReportedUsers, currentPage, pageSize]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(0); // 페이지 크기 변경 시 첫 페이지로 이동
  }, []);

  useEffect(() => {
    fetchReportedUsers(currentPage, pageSize);
  }, [currentPage, pageSize, fetchReportedUsers]);

  return {
    reportedUsers,
    totalPages,
    totalElements,
    currentPage,
    pageSize,
    isLoading,
    error,
    refreshData,
    grantUser,
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
  };
};
