'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { fetchLetters } from '@/backend/services/story/letters';
import { LetterDisplay } from '@/backend/types/letters';
import { Button, Loading } from '@/shared';
import { useLetterStore } from '@/stores/useLetterStore';

// 메시지 상수
const MESSAGE = {
  LOADING: '항해 편지를 불러오고 있어요...',
  ERROR: '편지를 불러오지 못했습니다. 다시 시도해주세요.',
  EMPTY: '아직 항해 편지가 없어요.',
};

export default function LetterListComponent() {
  const [letters, setLetters] = useState<LetterDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLetterCount } = useLetterStore();

  const loadLetters = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { letters: fetchedLetters, count } = await fetchLetters();
      setLetters(fetchedLetters);
      setLetterCount(count);
    } catch {
      setError(MESSAGE.ERROR);
      toast.error(MESSAGE.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [setLetterCount]);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading variant="signal" message={MESSAGE.LOADING} className="p-8" />
      </div>
    );
  }

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
    return <p className="p-4 text-gray-400">{MESSAGE.EMPTY}</p>;
  }

  return (
    <section aria-label="탐사 편지 목록" className="space-y-4 p-4">
      {letters.map((letter) => (
        <article
          key={letter.step}
          className="bg-black border-l-4 border-indigo-400 p-4 rounded shadow cursor-pointer"
        >
          <p className="text-sm text-gray-500">행성 {letter.step}단계</p>
          <p>{letter.content}</p>
        </article>
      ))}
    </section>
  );
}
