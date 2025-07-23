import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: NextRequest) {
  const userIdParam = req.nextUrl.pathname.split('/').pop();
  if (!userIdParam) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  try {
    if (!/^\d+$/.test(userIdParam)) {
      return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
    }

    const userId = BigInt(userIdParam);
    const letters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });

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

export async function POST(req: NextRequest) {
  const userIdParam = req.nextUrl.pathname.split('/').pop();
  if (!userIdParam) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  if (!/^\d+$/.test(userIdParam)) {
    return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
  }

  try {
    const userId = BigInt(userIdParam);
    const maxDepth = 5;
    const visited = new Set<bigint>();
    const path: bigint[] = [];

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

    await bfs(userId);

    const users = await prisma.users.findMany({
      where: { id: { in: path } },
      select: { id: true, name: true },
    });

    const responses = [];

    for (let i = 1; i < Math.min(path.length, 6); i++) {
      const fromId = path[i - 1];
      const toId = path[i];

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

      const fromName = users.find((u) => u.id === fromId)?.name ?? '어느 항해자';
      const toName = users.find((u) => u.id === toId)?.name ?? '다른 별';

      const prompt = `당신은 은하계 항해 AI입니다. ${fromName}의 데이터가 ${toName}에게 도달했습니다.\n이 사실을 짧고 감성적인 편지를 한 줄로 요약해주세요.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = completion.choices[0].message.content ?? '[편지 없음]';

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
