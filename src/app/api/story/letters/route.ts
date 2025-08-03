import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/shared/utils/getUserFromToken';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET: 현재 사용자에 대한 최장 경로 편지를 조회
export async function GET() {
  try {
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

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
        timeout: 20000,
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
    const result = await getUserFromToken();
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { userId } = result;

    const existingLetters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });
    const maxExistingStep = existingLetters.at(-1)?.step ?? 0;

    if (maxExistingStep >= 5) {
      console.log('편지 최대 5단계 도달 → 생성 생략');
      return new NextResponse(null, { status: 204 });
    }

    const visited = new Set<bigint>();
    const path: bigint[] = [];

    async function bfs(currentId: bigint) {
      if (visited.has(currentId)) return;
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

    const users = await prisma.users.findMany({
      where: { id: { in: path } },
      select: { id: true, name: true },
    });

    const newLetters = [];

    for (let i = 1; i < path.length; i++) {
      const fromId = path[i - 1];
      const toId = path[i];
      const step = i;

      const fromName = users.find((u) => u.id === fromId)?.name ?? '어느 항해자';
      const toName = users.find((u) => u.id === toId)?.name ?? '다른 별';

      const existing = await prisma.voyage_letters.findUnique({
        where: {
          user_id_step_recipient_id: {
            user_id: userId,
            step,
            recipient_id: toId,
          },
        },
      });

      if (existing) {
        newLetters.push(existing);
        continue;
      }

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

      // 경쟁 조건 대비: create 시도 → 실패 시 continue
      try {
        const created = await prisma.voyage_letters.create({
          data: {
            user_id: userId,
            step,
            recipient_id: toId,
            content,
            isLongestPath: true,
          },
        });
        newLetters.push(created);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          console.warn('이미 같은 편지가 생성됨 → 건너뜀');
          const fallback = await prisma.voyage_letters.findUnique({
            where: {
              user_id_step_recipient_id: {
                user_id: userId,
                step,
                recipient_id: toId,
              },
            },
          });
          if (fallback) {
            newLetters.push(fallback);
          }
          continue;
        }
        throw error;
      }
    }

    const currentPathLetterIds = newLetters.map((l) => l.id);

    await prisma.voyage_letters.updateMany({
      where: {
        user_id: userId,
        id: { notIn: currentPathLetterIds },
        isLongestPath: true,
      },
      data: { isLongestPath: false },
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error('편지 생성 오류:', error);
    return NextResponse.json({ error: '편지 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
