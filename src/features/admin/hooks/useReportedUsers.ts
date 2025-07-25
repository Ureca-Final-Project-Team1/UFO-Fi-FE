import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { reportAPI } from '@/api';
import { ReportedUser } from '@/api/types/report';

interface UseReportedUsersReturn {
  reportedUsers: ReportedUser[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  grantUser: (userId: number) => Promise<void>;
}

export const useReportedUsers = (): UseReportedUsersReturn => {
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 신고된 사용자 목록 조회
  const fetchReportedUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await reportAPI.getReportedUsers();
      setReportedUsers(response.content.reportedUsersReadRes);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '사용자 목록을 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 사용자 비활성화 해제
  const grantUser = useCallback(async (userId: number) => {
    try {
      setIsLoading(true);

      await reportAPI.grantUser({ userId });
      toast.success('사용자 활성화가 완료되었습니다.');

      // 목록에서 해당 사용자 제거
      setReportedUsers((prev) => prev.filter((user) => user.userid !== userId));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '사용자 활성화 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchReportedUsers();
  }, [fetchReportedUsers]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchReportedUsers();
  }, [fetchReportedUsers]);

  return {
    reportedUsers,
    isLoading,
    error,
    refreshData,
    grantUser,
  };
};
