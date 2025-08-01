import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
  }

  let userId: bigint;
  try {
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const id = decoded.id ?? decoded.sub;
    if (!id) {
      throw new Error('토큰에 user ID가 없습니다.');
    }
    userId = BigInt(id);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: '토큰이 만료되었습니다.' }, { status: 401 });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 401 });
    } else {
      console.error('Token processing error:', error);
      return NextResponse.json({ error: '인증에 실패했습니다.' }, { status: 401 });
    }
  }

  let body: { name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 });
  }

  const { name } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: '칭호 이름이 유효하지 않습니다.' }, { status: 400 });
  }

  try {
    const honorific = await prisma.honorific.findFirst({ where: { name } });

    if (!honorific) {
      return NextResponse.json({ error: '해당 이름의 칭호가 존재하지 않습니다.' }, { status: 404 });
    }

    // 사용자가 해당 칭호를 보유하고 있는지 확인
    const userOwnsHonorific = await prisma.user_honorific.findFirst({
      where: {
        user_id: userId,
        honorific_id: honorific.id,
      },
    });

    if (!userOwnsHonorific) {
      return NextResponse.json({ error: '보유하지 않은 칭호입니다.' }, { status: 403 });
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
