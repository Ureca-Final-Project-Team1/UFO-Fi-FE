import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET: 현재 사용자에 대한 최장 경로 편지를 조회
export async function GET() {
  try {
    // STEP 1. 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // 데이터베이스 쿼리 타임아웃 설정
    const queryStartTime = Date.now();
    const letters = await prisma.$transaction(
      async (prisma) => {
        return await prisma.voyage_letters.findMany({
          where: { user_id: userId, isLongestPath: true },
          orderBy: { step: 'asc' },
          take: 10,
        });
      },
      {
        timeout: 20000, // 20초 타임아웃
      },
    );

    const queryDuration = Date.now() - queryStartTime;
    console.warn('조회된 편지 수:', letters.length, '쿼리 시간:', queryDuration + 'ms');

    return NextResponse.json(
      letters.map((l) => ({
        id: l.id.toString(),
        user_id: l.user_id.toString(),
        step: l.step,
        recipient_id: l.recipient_id.toString(),
        content: l.content,
        isLongestPath: l.isLongestPath,
        created_at: l.created_at.toISOString(),
      })),
    );
  } catch (error) {
    console.error('편지 조회 실패:', error);

    // JWT 에러 처리
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: '토큰이 만료되었습니다.' }, { status: 401 });
    }

    return NextResponse.json({ error: '편지 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 사용자 기준으로 새로운 편지를 생성
export async function POST() {
  try {
    // STEP 1. 인증
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    // STEP 2. 기존 편지 조회
    const existingLetters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });
    const maxExistingStep = existingLetters.at(-1)?.step ?? 0;

    if (maxExistingStep >= 5) {
      console.log('편지 최대 5단계 도달 → 생성 생략');
      return new NextResponse(null, { status: 204 });
    }

    // STEP 3. BFS로 최장 거래 경로 계산
    const visited = new Set<bigint>();
    const path: bigint[] = [];

    async function bfs(currentId: bigint) {
      if (visited.has(currentId)) {
        return;
      }
      visited.add(currentId);
      path.push(currentId);

      const purchases = await prisma.trade_histories.findMany({
        where: { user_id: currentId, status: 'PURCHASE' },
        include: { trade_posts: { select: { user_id: true } } },
      });

      for (const history of purchases) {
        const sellerId = history.trade_posts?.user_id;
        if (sellerId && !visited.has(sellerId)) {
          await bfs(sellerId);
        }
      }
    }

    await bfs(userId);
    if (path.length > 6) path.length = 6;

    const bfsStep = path.length - 1;
    if (bfsStep <= maxExistingStep) {
      console.log(`BFS 경로(${bfsStep}) <= 기존 편지 최대 단계(${maxExistingStep}) → 생성 생략`);
      return new NextResponse(null, { status: 204 });
    }

    // STEP 4. 사용자 이름 조회
    const users = await prisma.users.findMany({
      where: { id: { in: path } },
      select: { id: true, name: true },
    });

    const newLetters = [];

    // STEP 5. 경로에 따라 GPT 편지 생성 및 저장
    for (let i = 1; i < path.length; i++) {
      const fromId = path[i - 1];
      const toId = path[i];
      const step = i;

      const fromName = users.find((u) => u.id === fromId)?.name ?? '어느 항해자';
      const toName = users.find((u) => u.id === toId)?.name ?? '다른 별';

      const prompt = `당신은 은하계 항해 AI입니다. ${fromName}의 데이터가 ${toName}에게 도달했습니다.\n이 사실을 감성적이거나 재치있는 편지로 한 줄 적어주세요.`;

      let content = '[편지 없음]';
      try {
        const completion = (await Promise.race([
          openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('OpenAI API timeout')), 15000),
          ),
        ])) as { choices: { message: { content: string } }[] };

        content = completion.choices[0].message.content ?? '[편지 없음]';
      } catch (error) {
        console.error('OpenAI 호출 실패:', error);
        content = `${fromName}의 데이터가 ${toName}에게 안전하게 도달했습니다.`;
      }

      const saved = await prisma.voyage_letters.upsert({
        where: { user_id_step: { user_id: userId, step } },
        update: { recipient_id: toId, content, isLongestPath: true },
        create: { user_id: userId, step, recipient_id: toId, content, isLongestPath: true },
      });

      newLetters.push(saved);
    }

    // STEP 6. 기존 편지 중 새 경로에 포함되지 않은 것들 → isLongestPath: false 처리
    const currentPathLetterIds = newLetters.map((l) => l.id);

    await prisma.voyage_letters.updateMany({
      where: { user_id: userId, id: { notIn: currentPathLetterIds } },
      data: { isLongestPath: false },
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error('편지 생성 오류:', error);
    return NextResponse.json({ error: '편지 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
