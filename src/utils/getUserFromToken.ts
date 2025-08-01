import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromToken() {
  const token = (await cookies()).get('Authorization')?.value;
  if (!token) {
    return { error: '인증 토큰이 없습니다.', status: 401 as const };
  }

  if (!process.env.JWT_SECRET) {
    return { error: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.', status: 500 as const };
  }

  try {
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const id = decoded.id ?? decoded.sub;
    if (!id) {
      return { error: '토큰에 유효한 사용자 ID가 없습니다.', status: 401 as const };
    }

    return { userId: BigInt(id) };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: '토큰이 만료되었습니다.', status: 401 as const };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { error: '토큰이 유효하지 않습니다.', status: 401 as const };
    } else {
      console.error('Token processing error:', error);
      return { error: '인증에 실패했습니다.', status: 401 as const };
    }
  }
}
