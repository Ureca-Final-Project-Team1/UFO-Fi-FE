import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';

// OpenAI 인스턴스 초기화
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * GET 요청 처리 - 사용자의 편지 리스트 조회
 */
export async function GET() {
  // 쿠키에서 JWT 토큰 추출
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Base64 디코딩된 secret 키로 JWT 검증
    const secret = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    // 사용자 ID 추출 (id 또는 sub 필드 사용)
    const userId = decoded.id ?? decoded.sub;

    // 해당 사용자의 모든 편지(step 순으로 정렬) 조회
    const letters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });

    // 날짜 포맷 및 ID 문자열 변환
    const serialized = letters.map((l) => ({
      id: l.id.toString(),
      user_id: l.user_id.toString(),
      step: l.step,
      recipient_id: l.recipient_id.toString(),
      content: l.content,
      created_at: l.created_at.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Letter fetch error:', error);
    return NextResponse.json({ error: '편지 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

/**
 * POST 요청 처리 - 항해 편지 생성
 */
export async function POST() {
  // 쿠키에서 JWT 토큰 추출
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // JWT 검증
    const secret = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const userId = decoded.id ?? decoded.sub;

    const maxDepth = 5; // 최대 깊이 제한
    const visited = new Set<bigint>(); // 방문한 노드 ID 저장
    const path: bigint[] = []; // BFS 탐색 경로 저장

    /**
     * 구매 이력을 따라 seller의 seller까지 BFS 탐색
     */
    async function bfs(currentId: bigint, depth = 0) {
      if (depth >= maxDepth || visited.has(currentId)) return;

      visited.add(currentId);
      path.push(currentId);

      const purchases = await prisma.trade_histories.findMany({
        where: { user_id: currentId, status: 'PURCHASE' },
        include: { trade_posts: { select: { user_id: true } } },
      });

      for (const history of purchases) {
        const sellerId = history.trade_posts?.user_id;
        if (sellerId && !visited.has(sellerId)) {
          await bfs(BigInt(sellerId), depth + 1);
        }
      }
    }

    // BFS 시작
    await bfs(userId);

    // 경로에 포함된 사용자 정보 조회
    const users = await prisma.users.findMany({
      where: { id: { in: path } },
      select: { id: true, name: true },
    });

    const responses = [];

    // 경로를 따라 편지 생성 또는 조회
    for (let i = 1; i < Math.min(path.length, 6); i++) {
      const fromId = path[i - 1];
      const toId = path[i];

      // 이미 생성된 편지가 있으면 재생성하지 않음
      const existing = await prisma.voyage_letters.findUnique({
        where: {
          user_id_step: {
            user_id: userId,
            step: i,
          },
        },
      });

      if (existing) {
        responses.push({ step: i, content: existing.content, status: 'existing' });
        continue;
      }

      // 편지에 들어갈 이름 가져오기 (없을 경우 기본값 사용)
      const fromName = users.find((u) => u.id === fromId)?.name ?? '어느 항해자';
      const toName = users.find((u) => u.id === toId)?.name ?? '다른 별';

      // AI 프롬프트 구성
      const prompt = `당신은 은하계 항해 AI입니다. ${fromName}의 데이터가 ${toName}에게 도달했습니다.\n이 사실을 짧고 감성적인 편지를 한 줄로 요약해주세요.`;

      // GPT 모델을 이용한 편지 생성
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = completion.choices[0].message.content ?? '[편지 없음]';

      // DB에 편지 저장
      const saved = await prisma.voyage_letters.create({
        data: {
          user_id: userId,
          step: i,
          recipient_id: toId,
          content,
        },
      });

      responses.push({ step: i, content: saved.content, status: 'created' });
    }

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Letter generation error:', error);
    return NextResponse.json({ error: '편지 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
