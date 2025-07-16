import { randomUUID } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

interface BulkResultItem {
  carrier: 'KT' | 'SKT' | 'LGU';
  message: string;
  dataAmount: number;
  price: number;
  seller: string;
  timeAgo: string;
}

interface BulkSearchData {
  searchId: string;
  capacity: number;
  budget: number;
  matchedData: number;
  expectedAmount: number;
  shortfall: number;
  dataList: BulkResultItem[];
  expiresAt: number;
}

// 메모리 기반 임시 저장소 (실제로는 Redis 권장)
const searchCache = new Map<string, BulkSearchData>();

// 5분마다 만료된 데이터 정리
setInterval(
  () => {
    const now = Date.now();
    for (const [id, data] of searchCache.entries()) {
      if (data.expiresAt < now) {
        searchCache.delete(id);
      }
    }
  },
  5 * 60 * 1000,
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { capacity, budget } = body;

    // 입력 값 검증
    if (!capacity || !budget || capacity <= 0 || budget <= 0) {
      return NextResponse.json({ error: '올바른 용량과 예산을 입력해주세요.' }, { status: 400 });
    }

    // 검색 로직 실행 (더미 데이터로 시뮬레이션)
    const matchedData = Math.min(capacity, 8);
    const expectedAmount = budget;
    const shortfall = Math.max(0, capacity - matchedData);

    const dataList: BulkResultItem[] = [
      {
        carrier: 'KT',
        message: '데이터 급처분합니다.',
        dataAmount: 1,
        price: 250,
        seller: '우주상인',
        timeAgo: '30분전',
      },
      {
        carrier: 'SKT',
        message: '5GB 데이터 판매',
        dataAmount: 5,
        price: 1200,
        seller: '은하상인',
        timeAgo: '1시간전',
      },
      {
        carrier: 'LGU',
        message: '대용량 데이터 특가',
        dataAmount: 3,
        price: 750,
        seller: '성간상인',
        timeAgo: '2시간전',
      },
    ];

    // 10분 후 만료
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const searchId = randomUUID();

    // 메모리에 임시 저장
    const searchData: BulkSearchData = {
      searchId,
      capacity,
      budget,
      matchedData,
      expectedAmount,
      shortfall,
      dataList,
      expiresAt,
    };

    searchCache.set(searchId, searchData);

    return NextResponse.json({
      searchId,
      matchedData,
      expectedAmount,
      shortfall,
      dataList,
      expiresAt: new Date(expiresAt).toISOString(),
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// GET 함수는 외부에서 searchCache에 접근할 수 있도록 export
export { searchCache };
