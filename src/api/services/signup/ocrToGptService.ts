import { OCR_PROMPT } from '@/features';

import { gptService } from './gptService';

export const ocrToGptService = async (formData: FormData): Promise<string[]> => {
  const response = await fetch('/api/ocr', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('OCR failed');
  }

  const data = await response.json();

  const gptResult = await gptService({ message: data.text, prompt: OCR_PROMPT });
  const parsed = gptResult.item;
  return parsed;
};
