import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

type QdrantPayload = {
  id: number;
  name: string;
  profile_photo_url: string;
  [key: string]: unknown;
};

type QdrantPoint = {
  id: number | string;
  score: number;
  payload?: QdrantPayload;
};

type QdrantResponse = {
  result?: QdrantPoint[];
};

export async function GET() {
  // STEP 1. 쿠키에서 JWT 토큰 추출 (로그인 여부 확인)
  // - 로그인한 사용자인지 판단하기 위해 Authorization 쿠키 확인
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // STEP 2. JWT 서명을 검증할 비밀 키가 설정되어 있는지 확인
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  try {
    // STEP 3. JWT 토큰 디코딩 → 유저 ID 추출
    // - payload에서 id 또는 sub 필드를 기준으로 사용자 식별
    const secret = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const userId = decoded.id ?? decoded.sub;

    // STEP 4. 해당 유저의 기본 정보 및 요금제 정보 조회
    // - 필터링 조건을 생성하기 위한 통신사, 데이터유형 등 확보 목적
    const baseUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: {
        user_plans: { include: { plans: true } },
      },
    });
    if (!baseUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // STEP 5. 최근 거래 이력을 통해 해당 유저의 거래 성향 분석
    // - 판매가 많으면 'seller', 구매가 많으면 'purchaser'로 분류
    const trades = await prisma.trade_histories.findMany({
      where: {
        user_id: baseUser.id,
        status: { in: ['PURCHASE', 'SALE'] },
      },
    });

    const sales = trades.filter((t) => t.status === 'SALE').length;
    const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
    const type = sales >= purchases ? 'seller' : 'purchaser';
    const oppositeType = type === 'seller' ? 'purchaser' : 'seller';

    // STEP 6. 사용자가 보유한 요금제 기반으로 가장 많이 이용한 통신사(carrier) 산출
    // - 다수 요금제 중 가장 빈도 높은 통신사를 추천 기준에 반영
    const rawPlans = baseUser.user_plans;
    const userPlans = Array.isArray(rawPlans) ? rawPlans : [];

    const carriers = userPlans.map((p) => p.plans?.carrier).filter((c): c is string => !!c);
    const carrier =
      carriers.sort(
        (a, b) => carriers.filter((v) => v === b).length - carriers.filter((v) => v === a).length,
      )[0] ?? '';

    // STEP 7. 사용자가 주로 이용한 데이터 유형(mobile_data_type) 파악
    // - LTE, 5G 등 유사 이용자군 추천을 위한 참고값
    const types = userPlans.map((p) => p.plans?.mobile_data_type).filter((t): t is string => !!t);
    const mobile_data_type =
      types.sort(
        (a, b) => types.filter((v) => v === b).length - types.filter((v) => v === a).length,
      )[0] ?? '';

    // STEP 8. 이미 팔로우한 사용자는 추천에서 제외
    // - 유사한 사람만 보이도록 추천 대상 중복 방지
    const followedUsers = await prisma.follows.findMany({
      where: { follower_user_id: Number(userId) },
      select: { following_user_id: true },
    });
    const followedIds = followedUsers.map((f) => Number(f.following_user_id));

    // STEP 9. Qdrant Recommend API 요청
    // - 기준 유저의 벡터를 기반으로 유사도가 높은 사용자 추천
    // - 조건: 일반 사용자만, 자기 자신 및 팔로우한 유저 제외
    // - 우선 순위 필터: 반대 거래유형, 동일 통신사, 동일 데이터유형
    const qdrantUrl = `${process.env.QDRANT_API_BASE_URL}/collections/ufo_fi/points/recommend`;

    const res = await fetch(qdrantUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.QDRANT_API_KEY!,
      },
      body: JSON.stringify({
        positive: [Number(userId)], // 벡터 기반 추천의 기준 사용자 ID
        limit: 20, // 최대 추천 수
        with_payload: true, // 추천 대상의 추가 정보도 함께 받기
        filter: {
          must: [
            { key: 'role', match: { value: 1 } }, // 일반 사용자만 추천 (관리자 제외)
          ],
          must_not: [
            { key: 'id', match: { value: Number(userId) } }, // 자기 자신 제외
            ...followedIds.map((id) => ({ key: 'id', match: { value: id } })), // 이미 팔로우한 유저 제외
          ],
          should: [
            { key: 'type', match: { value: oppositeType } }, // 반대 거래 유형 우선
            { key: 'carrier', match: { value: carrier } }, // 동일 통신사 우선
            { key: 'mobile_data_type', match: { value: mobile_data_type } }, // 동일 데이터 유형 우선
          ],
        },
      }),
    });

    // STEP 10. Qdrant API 요청 실패 시 상세 에러 로그 출력
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Qdrant request failed: ${res.status} ${res.statusText}\n${errorText}`);
    }

    // STEP 11. 추천 결과 파싱 및 사용자 정보 매핑
    // - score가 높을수록 유사도가 높은 사용자
    const data: QdrantResponse = await res.json();
    const neighbors = Array.isArray(data.result)
      ? data.result.map((point) => ({
          id: point.payload?.id,
          nickname: point.payload?.name,
          profile: point.payload?.profile_photo_url,
          score: point.score,
        }))
      : [];

    // STEP 12. 최종 응답 반환 (추천 사용자 리스트)
    return NextResponse.json({
      neighbors,
      message: neighbors.length > 0 ? '추천 결과 반환 성공' : '추천 결과가 없습니다',
    });
  } catch (err) {
    // STEP 13. 예외 발생 시 서버 에러 반환
    console.error('Recommend failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
