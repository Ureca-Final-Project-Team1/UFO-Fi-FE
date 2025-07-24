'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EmblaCarousel from '@/features/profile/components/Carousel/EmblaCarousel';
import { Button } from '@/shared';

type Neighbor = {
  id: number;
  nickname: string;
  profile: string;
};

const TestPage = () => {
  const router = useRouter();
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (id: number) => {
    router.push(`/profile/${id}`);
  };

  useEffect(() => {
    const resetAndSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        // // 1. DELETE & POST
        // const postRes = await fetch('/api/collections', { method: 'POST' });
        // if (!postRes.ok) throw new Error('컬렉션 생성 또는 시딩 실패');

        // 2. GET
        const searchRes = await fetch('/api/collections/search', { method: 'GET' });

        if (!searchRes.ok) {
          const errorData = await searchRes.json().catch(() => ({}));
          throw new Error(
            `유사 사용자 검색 실패: ${searchRes.status} ${errorData.error || searchRes.statusText}`,
          );
        }

        const data = await searchRes.json();
        setNeighbors(data.neighbors ?? []);
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
      <h1 className="text-2xl font-bold mb-4">🔄 초기화 후 유사한 사용자 Top 20</h1>

      {loading && <p className="text-blue-500">로딩 중...</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {!loading && neighbors.length === 0 && !error && (
        <p className="text-gray-500">유사한 사용자가 없습니다.</p>
      )}

      {!loading && neighbors.length > 0 && (
        <div className="overflow-x-auto">
          <EmblaCarousel
            options={{
              align: 'start',
              loop: false,
              dragFree: false,
              containScroll: 'trimSnaps',
            }}
            className="flex gap-4 px-2"
          >
            {neighbors.map((n, i) => (
              <div
                key={n.id}
                className="min-w-[130px] flex flex-col gap-2 justify-between items-center rounded-xl p-3 shadow-md bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Image
                  src={n.profile}
                  alt={`사용자-${i}`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-2 border-white"
                />
                <p className="caption-14-bold text-center text-white drop-shadow">{n.nickname}</p>
                <Button
                  onClick={() => handleClick(n.id)}
                  className="w-full h-7 rounded-md caption-14-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                >
                  팔로우
                </Button>
              </div>
            ))}
          </EmblaCarousel>
        </div>
      )}
    </div>
  );
};

export default TestPage;
