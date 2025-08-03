'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { LetterDisplay, fetchLetters } from '@/api';
import { Button, Loading } from '@/shared';
import { useLetterStore } from '@/stores/useLetterStore';

type Letter = LetterDisplay;

export default function LetterListComponent() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLetterCount } = useLetterStore();

  const loadLetters = useCallback(async () => {
    try {
      //편지 불러오기 시작
      setIsLoading(true);
      setError(null);

      const { letters: fetchedLetters, count } = await fetchLetters();
      // 편지 불러오기 성공해서 상태 업데이트
      setLetters(fetchedLetters);
      setLetterCount(count);
    } catch {
      // 편지 불러오기 실패
      setError('편지를 불러오지 못했습니다...');
      toast.error('편지를 불러오지 못했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [setLetterCount]);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  // 로딩 중일 때 시그널 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading variant="signal" message="항해 편지를 불러오고 있어요..." className="p-8" />
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-400 mb-2">{error}</p>
        <Button size="default" variant="primary" onClick={loadLetters} className="mt-auto my-8">
          다시 시도
        </Button>
      </div>
    );
  }

  if (letters.length === 0) {
    return <p className="p-4">아직 항해 편지가 없어요.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {letters.map((letter) => (
        <div
          key={letter.step}
          className="bg-black border-l-4 border-indigo-400 p-4 rounded shadow cursor-pointer"
        >
          <p className="text-sm text-gray-500">행성 {letter.step}단계</p>
          <p>{letter.content}</p>
        </div>
      ))}
    </div>
  );
}
