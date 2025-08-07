'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { fetchLetters } from '@/backend/services/story/letters';
import { LetterDisplay } from '@/backend/types/letters';
import { Button, Loading } from '@/shared';
import { useLetterStore } from '@/stores/useLetterStore';

const MESSAGE = {
  LOADING: '항해 편지를 불러오고 있어요...',
  ERROR: '편지를 불러오지 못했습니다. 다시 시도해주세요.',
  EMPTY: '아직 항해 편지가 없어요.',
};

interface LetterListComponentProps {
  tutorialStep?: number;
}

export default function LetterListComponent({ tutorialStep }: LetterListComponentProps) {
  const [letters, setLetters] = useState<LetterDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLetterCount } = useLetterStore();

  // 실제 API 요청 함수 (튜토리얼 중엔 절대 호출되지 않음)
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
    if (tutorialStep !== undefined && tutorialStep >= 0) {
      // 튜토리얼일 경우: 더미 데이터만 사용 (setLetterCount도 호출하지 않음)
      setLetters([
        {
          step: 1,
          content:
            '소중한 데이터가 우주를 건너 웃기는 지구인 #004의 손에 닿았으니, 두 마음이 별빛처럼 반짝이기 시작합니다.',
        },
        {
          step: 2,
          content:
            '웃기는 지구인 #004의 바람결에 실린 속삭임이 마침내 정직한 지구인 #045의 마음에 닿았습니다—우주도 잇는 우리의 이야기처럼.',
        },
        {
          step: 3,
          content:
            '은하계 저 너머를 넘어, 정직한 지구인 #045의 속삭임이 드디어 신나는 지구인 #065의 마음에 닿았습니다.',
        },
      ]);
      setIsLoading(false);
      setError(null);
      return;
    }
    // 일반 케이스: 실제 API 호출 전 로딩 표시
    setIsLoading(true);
    loadLetters();
  }, [tutorialStep, loadLetters]);

  // 튜토리얼일 때는 로딩 없이 바로 더미데이터 렌더링
  if (tutorialStep !== undefined && tutorialStep >= 0) {
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

  // 튜토리얼이 아니고 로딩 중이면 Loading 컴포넌트 렌더링
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
