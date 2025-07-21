'use client';

import { useEffect, useState } from 'react';

const myUserId = 1;

type Neighbor = {
  id: number;
  score: number;
};

const TestPage = () => {
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resetAndSearch = async () => {
      try {
        setLoading(true);
        setMessage(null);
        setError(null);

        // // 1. DELETE & POST
        // const postRes = await fetch('/api/collections', { method: 'POST' });
        // if (!postRes.ok) throw new Error('❌ 컬렉션 생성 또는 시딩 실패');

        // 2. GET
        const searchRes = await fetch(`/api/collections/search?id=${myUserId}`);
        const data = await searchRes.json();

        if (!searchRes.ok) {
          throw new Error(data.error || '❌ 유사 사용자 검색 실패');
        }

        setNeighbors(data.neighbors ?? []);
        setMessage('✅ 초기화 및 유사 사용자 검색 완료');
      } catch (err) {
        setError(`에러 발생: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      } finally {
        setLoading(false);
      }
    };

    resetAndSearch();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔄 초기화 후 유사한 사용자 Top 5</h1>

      {loading && <p className="text-blue-500">로딩 중...</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {!loading && neighbors.length === 0 && !error && (
        <p className="text-gray-500">유사한 사용자가 없습니다.</p>
      )}

      {!loading && neighbors.length > 0 && (
        <ul className="space-y-4">
          {neighbors.map((n, i) => (
            <li key={n.id} className="border rounded-lg p-4 shadow-sm">
              <p className="text-lg font-semibold">👤 유저 ID: {n.id}</p>
              <p>
                📈 유사도 점수: <strong>{n.score.toFixed(4)}</strong>
              </p>
              <p>🏆 순위: {i + 1}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestPage;
