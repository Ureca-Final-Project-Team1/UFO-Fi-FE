import { useMutation } from '@tanstack/react-query';

import { gptService } from '@/service/gptService';
import { ocrService } from '@/service/ocrService';
import { OCR_PROMPT } from '@/utils/OCRPrompt';

const handleOCRToGpt = async (formData: FormData): Promise<string> => {
  const ocrResult = await ocrService(formData);
  const gptResult = await gptService({ message: ocrResult, prompt: OCR_PROMPT });

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
