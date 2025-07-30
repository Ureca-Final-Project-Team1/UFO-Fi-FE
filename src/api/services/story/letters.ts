import { nextApiRequest } from '@/api/client/axios';

export interface Letter {
  id: string;
  user_id: string;
  step: number;
  recipient_id: string;
  content: string;
  isLongestPath: boolean;
  created_at: string;
}

export interface LetterDisplay {
  step: number;
  content: string;
}

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

    const letters = data.map((letter) => ({
      step: Number(letter.step),
      content: letter.content,
    }));

    return {
      letters,
      count: data.length,
    };
  } catch (error) {
    console.error('편지 처리 실패:', error);
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
  try {
    const res = await nextApiRequest.get('/api/story/letters');
    const data = res.data as Letter[];

    const letters = data.map((letter) => ({
      step: Number(letter.step),
      content: letter.content,
    }));

    return {
      letters,
      count: data.length,
    };
  } catch (error) {
    console.error('편지 불러오기 실패:', error);
    throw new Error('편지를 불러오는데 실패했습니다.');
  }
}
