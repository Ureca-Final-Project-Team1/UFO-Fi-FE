import { nextApiRequest } from '@/api/client/axios';
import { Letter, LetterDisplay } from '@/api/types/letters';

/**
 * 편지를 생성하고 가져오는 함수
 * @returns 편지 목록과 개수
 */
export async function fetchAndCreateLetters(): Promise<{
  letters: LetterDisplay[];
  count: number;
}> {
  try {
    // 편지 생성 요청
    await nextApiRequest.post('/api/story/letters');

    // 편지 목록 가져오기
    const res = await nextApiRequest.get('/api/story/letters');
    const data = res.data as Letter[];

    return {
      letters: data.map(({ step, content }) => ({ step, content })),
      count: data.length,
    };
  } catch (error: unknown) {
    const errorObj = error as Error & { statusCode?: string; response?: unknown };
    console.error('편지 처리 실패:', {
      message: errorObj?.message ?? '알 수 없는 오류',
      statusCode: errorObj?.statusCode ?? 'unknown',
      response: errorObj?.response ?? 'unknown',
    });
    throw new Error('편지를 처리하는데 실패했습니다.');
  }
}

/**
 * 편지 목록만 가져오는 함수
 * @returns 편지 목록과 개수
 */
export async function fetchLetters(): Promise<{
  letters: LetterDisplay[];
  count: number;
}> {
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await nextApiRequest.get('/api/story/letters');
      const data = res.data as Letter[];

      return {
        letters: data.map(({ step, content }) => ({ step, content })),
        count: data.length,
      };
    } catch (error: unknown) {
      const errorObj = error as Error & { message?: string; statusCode?: string };
      const isTimeout = errorObj?.message?.includes('timeout');
      console.error(`편지 불러오기 실패 (시도 ${attempt}/${maxRetries}):`, {
        message: errorObj?.message ?? '알 수 없는 오류',
        statusCode: errorObj?.statusCode ?? 'unknown',
        isTimeout,
      });

      // 타임아웃이 아니면 재시도하지 않음
      if (!isTimeout || attempt === maxRetries) {
        break;
      }

      // 타임아웃인 경우 잠시 대기 후 재시도
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }

  throw new Error('편지를 불러오는데 실패했습니다.');
}
