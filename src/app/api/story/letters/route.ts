import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET: 현재 사용자에 대한 최장 경로 편지를 조회
export async function GET() {
  const result = await getUserFromToken();
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { userId } = result;

  try {
    const letters = await prisma.voyage_letters.findMany({
      where: { user_id: userId, isLongestPath: true },
      orderBy: { step: 'asc' },
    });

    // 편지가 없는 경우에도 빈 배열로 정상 응답
    if (!letters || letters.length === 0) {
      return NextResponse.json([]);
    }

    const response = letters.map((l) => ({
      id: l.id.toString(),
      user_id: l.user_id.toString(),
      step: l.step,
      recipient_id: l.recipient_id.toString(),
      content: l.content,
      isLongestPath: l.isLongestPath,
      created_at: l.created_at.toISOString(),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Letter fetch error:', error);
    return NextResponse.json({ error: '편지를 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 사용자 기준으로 새로운 편지를 생성
export async function POST() {
  const result = await getUserFromToken();
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { userId } = result;

  try {
    // 이미 생성된 편지 중 최대 step 확인
    const existingLetters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });

    const maxExistingStep = existingLetters.at(-1)?.step ?? 0;
    if (maxExistingStep >= 5) {
      // 최대 단계 도달한 경우 새 편지 생성하지 않음
      return new NextResponse(null, { status: 204 });
    }

    // BFS를 이용하여 최장 거래 경로 찾기
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
    if (path.length > 6) path.length = 6; // 최대 편지 수 5개 → 6인 경우 도달자까지 포함

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

      const prompt = `당신은 은하계 항해 AI입니다. ${fromName}의 데이터가 ${toName}에게 도달했습니다.\n이 사실을 감성적이거나 재치있는 편지로 한 줄 적어주세요.`;

      let content: string;
      try {
        // GPT에게 편지 생성 요청
        const completion = await openai.chat.completions.create({
          model: 'gpt-4.1-mini',
          messages: [{ role: 'user', content: prompt }],
        });
        content = completion.choices[0].message.content ?? '[편지 없음]';
      } catch (openaiError) {
        console.error('OpenAI 응답 오류:', openaiError);
        return NextResponse.json(
          { error: '편지를 생성하는 중 OpenAI API 오류가 발생했습니다.' },
          { status: 502 },
        );
      }

      const saved = await prisma.voyage_letters.upsert({
        where: { user_id_step: { user_id: userId, step } },
        update: { recipient_id: toId, content, isLongestPath: true },
        create: { user_id: userId, step, recipient_id: toId, content, isLongestPath: true },
      });

      newLetters.push(saved);
    }

    const currentPathLetterIds = newLetters.map((l) => l.id);

    // 현재 최장 경로에 포함되지 않은 기존 편지들 → isLongestPath를 false로 변경
    await prisma.voyage_letters.updateMany({
      where: { user_id: userId, id: { notIn: currentPathLetterIds } },
      data: { isLongestPath: false },
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error('Letter generation error:', error);
    return NextResponse.json({ error: '편지 생성 중 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
