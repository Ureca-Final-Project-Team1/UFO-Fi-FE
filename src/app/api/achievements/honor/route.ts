import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  // 1. 쿠키에서 JWT 토큰 꺼내기
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
  }

  // 2. JWT 디코딩 및 userId 추출
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

  // 3. 유저의 칭호 보유 내역 조회
  try {
    let userHonorifics = await prisma.user_honorific.findMany({
      where: { user_id: userId },
      include: {
        honorific: true,
      },
      orderBy: {
        honorific: {
          level: 'asc',
        },
      },
    });

    // 4. 없다면 기본 레벨 0 칭호 부여
    if (userHonorifics.length === 0) {
      const baseHonor = await prisma.honorific.findFirst({
        where: { level: 0 },
      });

      if (baseHonor) {
        await prisma.user_honorific.create({
          data: {
            user_id: userId,
            honorific_id: baseHonor.id,
            is_active: true,
          },
        });

        // 다시 조회
        userHonorifics = await prisma.user_honorific.findMany({
          where: { user_id: userId },
          include: {
            honorific: true,
          },
          orderBy: {
            honorific: {
              level: 'asc',
            },
          },
        });
      }
    }

    // 5. 결과 반환
    return NextResponse.json({
      userId: userId.toString(),
      honorifics: userHonorifics.map((uh) => ({
        id: uh.honorific.id.toString(),
        name: uh.honorific.name,
        level: uh.honorific.level,
        isActive: uh.is_active,
      })),
    });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: '데이터베이스 연결에 실패했습니다.' }, { status: 500 });
  }
}
