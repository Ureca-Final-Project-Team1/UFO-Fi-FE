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
  expiresAt: number; // timestamp
}

// 같은 메모리 캐시를 사용하기 위해 전역 변수로 선언
declare global {
  var bulkSearchCache: Map<string, BulkSearchData> | undefined;
}

// 글로벌 캐시 초기화
const searchCache = globalThis.bulkSearchCache ?? new Map<string, BulkSearchData>();
globalThis.bulkSearchCache = searchCache;

export async function GET(request: NextRequest, { params }: { params: { searchId: string } }) {
  try {
    const { searchId } = params;

    if (!searchId) {
      return NextResponse.json({ error: '검색 ID가 필요합니다.' }, { status: 400 });
    }

    const data = searchCache.get(searchId);

    if (!data) {
      return NextResponse.json({ error: '검색 결과를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 만료 검사
    if (data.expiresAt < Date.now()) {
      searchCache.delete(searchId);
      return NextResponse.json({ error: '검색 결과가 만료되었습니다.' }, { status: 410 });
    }

    // 성공 응답
    return NextResponse.json({
      searchId: data.searchId,
      matchedData: data.matchedData,
      expectedAmount: data.expectedAmount,
      shortfall: data.shortfall,
      dataList: data.dataList,
      expiresAt: new Date(data.expiresAt).toISOString(),
    });
  } catch (error) {
    console.error('Get Search Result API Error:', error);
    return NextResponse.json({ error: '결과 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
