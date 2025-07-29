import { ChatResult } from '@/types/ocr';

export const gptService = async (info: {
  message: string;
  prompt: string;
}): Promise<ChatResult> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error('GPT 분석 실패');
  }

  return result;
};
