'use client';

import { useEffect, useState } from 'react';

type Letter = {
  step: number;
  content: string;
};

export default function VoyageLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLetters() {
      setLoading(true);
      try {
        // TODO: userId 수정 필요
        await fetch(`/api/story/letters/${10}`, { method: 'POST' });
        const res = await fetch(`/api/story/letters/${10}`);
        const data = await res.json();
        setLetters(data);
      } catch (e) {
        console.error('편지 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchLetters();
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-400">항해 중 편지를 불러오는 중입니다...</p>;
  }

  if (letters.length === 0) {
    return <p className="p-4">아직 항해 편지가 없어요.</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">🌌 항해 편지</h2>
      {letters.map((letter) => (
        <div key={letter.step} className="bg-black border-l-4 border-indigo-400 p-4 rounded shadow">
          <p className="text-sm text-gray-500">행성 {letter.step}단계</p>
          <p>{letter.content}</p>
        </div>
      ))}
    </div>
  );
}
