import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/utils/getUserFromToken';

export async function GET() {
  // STEP 1. 쿠키에서 JWT 토큰 추출 (로그인 여부 확인)
  const result = await getUserFromToken();
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { userId } = result;

  // 2. 유저의 칭호 보유 내역 조회
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

    // 3. 없다면 기본 레벨 0 칭호 부여
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

    // 4. 결과 반환
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
