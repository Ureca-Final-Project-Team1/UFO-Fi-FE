import { NextRequest } from 'next/server';

import { qdrantClient } from '@/lib/qdrantClient';

export async function GET(req: NextRequest) {
  try {
    // STEP 1. 쿼리스트링에서 userId 추출
    // 예: /api/collections/user-stats?userId=123
    const userIdParam = req.nextUrl.searchParams.get('userId');

    // STEP 2. userId가 없는 경우 → 잘못된 요청 응답
    if (!userIdParam) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    // STEP 3. userId 문자열을 숫자로 파싱 (숫자가 아니면 오류)
    const userId = Number(userIdParam);
    if (isNaN(userId)) {
      return new Response(JSON.stringify({ error: 'Invalid userId' }), { status: 400 });
    }

    // STEP 4. Qdrant 벡터 검색 요청
    // - 해당 userId에 대한 point를 검색
    // - 필터만 사용할 것이므로 vector는 dummy ([0, 0, 0, 0])
    // - with_vector: true → 벡터 값도 함께 반환받기
    // - with_payload: true → dominant_trade_time 등 메타데이터 포함
    const result = await qdrantClient.search('ufo_fi', {
      limit: 1,
      filter: {
        must: [
          {
            key: 'id',
            match: { value: userId },
          },
        ],
      },
      vector: [0, 0, 0, 0],
      with_payload: true,
      with_vector: true,
    });

    // STEP 5. Qdrant에 해당 userId가 존재하지 않는 경우
    if (!result.length) {
      return new Response(JSON.stringify({ error: 'User not found in Qdrant' }), { status: 404 });
    }

    // STEP 6. 유저의 벡터 및 payload 정보 추출
    const point = result[0];
    const vector = point.vector as number[]; // [avg_zet, data_gb, trade_frequency, recent_post_days]

    // STEP 7. 벡터에서 trade_frequency 항목 추출 (인덱스 2번)
    // - normalize된 값이므로, 다시 0~100 범위로 복원
    const normalizedFreq = vector[2] ?? 0;
    const trade_frequency = Math.round(normalizedFreq * 100);

    // STEP 8. payload에서 dominant_trade_time 추출 (없으면 unknown)
    const dominant_trade_time = point.payload?.dominant_trade_time ?? 'unknown';

    // STEP 9. 최종 결과 반환
    return new Response(
      JSON.stringify({
        trade_frequency,
        dominant_trade_time,
      }),
      { status: 200 },
    );
  } catch (error) {
    // STEP 10. 에러 발생 시 내부 서버 오류 처리
    console.error('[GET /collections/user-stats] error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
