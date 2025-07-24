'use client';

import { useEffect, useState } from 'react';

type Letter = {
  step: number;
  content: string;
};

export default function VoyageLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLetters() {
      setLoading(true);
      setError(null);
      try {
        const postRes = await fetch('/api/story/letters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!postRes.ok) {
          throw new Error('편지 전송 실패');
        }

        const getRes = await fetch('/api/story/letters');
        const data = await getRes.json();
        setLetters(data);
      } catch (e) {
        console.error('편지 불러오기 실패:', e);
        setError('편지를 불러오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    }

    fetchLetters();
  }, []);

  if (loading) {
    return <p className="p-4 text-gray-400">항해 중 편지를 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-400">{error}</p>;
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
