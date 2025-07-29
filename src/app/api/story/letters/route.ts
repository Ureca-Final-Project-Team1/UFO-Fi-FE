import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

import { prisma } from '@/lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST() {
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');

  try {
    const secret = Buffer.from(process.env.JWT_SECRET!, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const userId = BigInt(decoded.id ?? decoded.sub);

    // STEP 1: 기존 편지 최대 step 조회
    const existingLetters = await prisma.voyage_letters.findMany({
      where: { user_id: userId },
      orderBy: { step: 'asc' },
    });
    const maxExistingStep = existingLetters.at(-1)?.step ?? 0;

    // STEP 2: step 5 이상이면 편지 그대로 반환
    if (maxExistingStep >= 5) {
      const current = await prisma.voyage_letters.findMany({
        where: { user_id: userId, isLongestPath: true },
        orderBy: { step: 'asc' },
      });

      const serialized = current.map((l) => ({
        id: l.id.toString(),
        user_id: l.user_id.toString(),
        step: l.step,
        recipient_id: l.recipient_id.toString(),
        content: l.content,
        isLongestPath: l.isLongestPath,
        created_at: l.created_at.toISOString(),
      }));

      return NextResponse.json(serialized);
    }

    // STEP 3: BFS로 최장 경로 찾기
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

    const users = await prisma.users.findMany({
      where: { id: { in: path } },
      select: { id: true, name: true },
    });

    const existingMap = new Map<number, (typeof existingLetters)[number]>(
      existingLetters.map((l) => [l.step, l]),
    );
    const newLetters: (typeof existingLetters)[number][] = [];

    let prefixEnd = 1;
    for (; prefixEnd < path.length; prefixEnd++) {
      const toId = path[prefixEnd];
      const existing = existingMap.get(prefixEnd);
      if (!existing || existing.recipient_id !== toId) break;
    }

    for (let i = prefixEnd; i < path.length; i++) {
      const fromId = path[i - 1];
      const toId = path[i];
      const step = i;

      const fromName = users.find((u) => u.id === fromId)?.name ?? '어느 항해자';
      const toName = users.find((u) => u.id === toId)?.name ?? '다른 별';

      const prompt = `당신은 은하계 항해 AI입니다. ${fromName}의 데이터가 ${toName}에게 도달했습니다.\n이 사실을 감성적이거나 재치있는 편지로 한 줄 적어주세요.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.0',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = completion.choices[0].message.content ?? '[편지 없음]';

      const saved = await prisma.voyage_letters.create({
        data: {
          user_id: userId,
          step,
          recipient_id: toId,
          content,
          isLongestPath: true,
        },
      });

      newLetters.push(saved);
    }

    const currentPathLetterIds = [
      ...existingLetters.filter((l) => l.step < prefixEnd).map((l) => l.id),
      ...newLetters.map((l) => l.id),
    ];

    await prisma.voyage_letters.updateMany({
      where: {
        user_id: userId,
        id: { notIn: currentPathLetterIds },
      },
      data: { isLongestPath: false },
    });

    await prisma.voyage_letters.updateMany({
      where: { id: { in: currentPathLetterIds } },
      data: { isLongestPath: true },
    });

    const finalLetters = await prisma.voyage_letters.findMany({
      where: { user_id: userId, isLongestPath: true },
      orderBy: { step: 'asc' },
    });

    const serialized = finalLetters.map((l) => ({
      id: l.id.toString(),
      user_id: l.user_id.toString(),
      step: l.step,
      recipient_id: l.recipient_id.toString(),
      content: l.content,
      isLongestPath: l.isLongestPath,
      created_at: l.created_at.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Letter generation error:', error);
    return NextResponse.json({ error: '편지 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
