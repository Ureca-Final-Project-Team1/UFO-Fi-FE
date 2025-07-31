'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { fetchAndCreateLetters, type LetterDisplay } from '@/api/services/story/letters';
import { useLetterStore } from '@/stores/useLetterStore';

type Letter = LetterDisplay;

export default function LetterComponent() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const { setLetterCount } = useLetterStore();

  useEffect(() => {
    async function loadLetters() {
      try {
        const { letters: fetchedLetters, count } = await fetchAndCreateLetters();
        setLetters(fetchedLetters);

        // 전역 상태에 편지 개수 업데이트
        setLetterCount(count);
      } catch (e) {
        console.error('편지 불러오기 실패:', e);
        toast.error('편지를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    }

    loadLetters();
  }, [setLetterCount]);

  if (letters.length === 0) {
    return <p className="p-4">아직 항해 편지가 없어요.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">🌌 항해 편지</h2>
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
