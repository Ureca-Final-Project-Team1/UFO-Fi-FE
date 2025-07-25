import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { reportAPI } from '@/api';
import { ReportedPost } from '@/api/types/report';

interface UseReportedPostsReturn {
  reportedPosts: ReportedPost[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  rollBackReport: (tradePostId: number) => Promise<void>;
}

export const useReportedPosts = (): UseReportedPostsReturn => {
  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 신고된 게시물 목록 조회
  const fetchReportedPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await reportAPI.getReportedPosts();
      setReportedPosts(response.content.rollBackReportsReadRes || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '신고된 게시물을 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 신고 해지
  const rollBackReport = useCallback(async (tradePostId: number) => {
    try {
      setIsLoading(true);

      await reportAPI.rollBackReport({ tradePostId });
      toast.success('신고가 해지되었습니다.');

      // 목록에서 해당 게시물 제거
      setReportedPosts((prev) => prev.filter((post) => post.postId !== tradePostId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '신고 해지 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchReportedPosts();
  }, [fetchReportedPosts]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchReportedPosts();
  }, [fetchReportedPosts]);

  return {
    reportedPosts,
    isLoading,
    error,
    refreshData,
    rollBackReport,
  };
};
