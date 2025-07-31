import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');

  let userId: bigint;
  try {
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const id = decoded.id ?? decoded.sub;
    if (!id) throw new Error('User ID missing in token');
    userId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  let body: { name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid honorific name' }, { status: 400 });
  }

  try {
    const honorific = await prisma.honorific.findFirst({ where: { name } });

    if (!honorific) {
      return NextResponse.json({ error: '해당 이름의 칭호가 존재하지 않습니다.' }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.user_honorific.updateMany({
        where: { user_id: userId, is_active: true },
        data: { is_active: false },
      }),
      prisma.user_honorific.updateMany({
        where: { user_id: userId, honorific_id: honorific.id },
        data: { is_active: true },
      }),
    ]);

    return NextResponse.json({ message: '칭호가 성공적으로 변경되었습니다.' });
  } catch (err) {
    console.error('[honorific select error]', err);
    return NextResponse.json({ error: '서버 오류로 변경에 실패했습니다.' }, { status: 500 });
  }
}
