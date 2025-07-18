import { useMutation } from '@tanstack/react-query';

import { gptOCR } from '@/service/gpt';
import { planOCR } from '@/service/ocr';
import { OCR_PROMPT } from '@/utils/OCRPrompt';

const handleOCRToGpt = async (formData: FormData): Promise<string> => {
  const ocrResult = await planOCR(formData);
  const gptResult = await gptOCR({ message: ocrResult, prompt: OCR_PROMPT });

  const parsed = gptResult.item;
  return parsed;
};

export const useOCRToGptMutation = (onComplete: (result: string) => void) => {
  return useMutation<string, Error, FormData>({
    mutationKey: ['ocrToGpt'],
    mutationFn: handleOCRToGpt,
    onSuccess: onComplete,
    onError: (err) => {
      console.error('OCR+GPT 실패:', err);
    },
  });
};
