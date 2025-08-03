'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { fetchAndCreateLetters, fetchLetters } from '@/api';
import { useLetterStore } from '@/stores/useLetterStore';

/**
 * 편지 관련 상태와 함수들을 제공하는 커스텀 훅
 */
export function useLetters() {
  const { letterCount, planetStatus, setLetterCount, getCompletedPlanets } = useLetterStore();

  /**
   * 편지를 생성하고 상태를 업데이트하는 함수
   */
  const createAndFetchLetters = useCallback(async () => {
    try {
      const { count } = await fetchAndCreateLetters();
      setLetterCount(count);
      toast.success('편지가 성공적으로 생성되었습니다!');
      return count;
    } catch (error) {
      console.error('편지 생성 실패:', error);
      toast.error('편지를 생성하는데 실패했습니다. 다시 시도해주세요.');
      throw error;
    }
  }, [setLetterCount]);

  /**
   * 편지 목록을 가져와서 상태를 업데이트하는 함수
   */
  const refreshLetters = useCallback(async () => {
    try {
      const { count } = await fetchLetters();
      setLetterCount(count);
      return count;
    } catch (error) {
      console.error('편지 조회 실패:', error);
      toast.error('편지를 불러오는데 실패했습니다. 다시 시도해주세요.');
      throw error;
    }
  }, [setLetterCount]);

  /**
   * 컴포넌트 초기화 시 편지 상태를 로드하는 함수 (에러 시 조용히 실패)
   */
  const initializeLetters = useCallback(async () => {
    try {
      const { count } = await fetchLetters();
      setLetterCount(count);
      return count;
    } catch (error) {
      console.error('편지 상태 초기화 실패:', error);
      // 초기화 시에는 토스트를 표시하지 않음
      return 0;
    }
  }, [setLetterCount]);

  return {
    // 상태
    letterCount,
    planetStatus,
    completedPlanets: getCompletedPlanets(),

    // 함수
    createAndFetchLetters,
    refreshLetters,
    initializeLetters,
    setLetterCount,
  };
}
