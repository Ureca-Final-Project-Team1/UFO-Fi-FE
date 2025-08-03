'use client';

import { useMutation } from '@tanstack/react-query';

import { ocrToGptService } from '@/api';

const handleOCRToGpt = async (formData: FormData): Promise<string[]> => {
  const result = await ocrToGptService(formData);
  return result;
};

export const useOCRToGptMutation = (onComplete: (result: string[]) => void) => {
  return useMutation<string[], Error, FormData>({
    mutationKey: ['ocrToGpt'],
    mutationFn: handleOCRToGpt,
    onSuccess: onComplete,
    onError: (err) => {
      console.error('OCR+GPT 실패:', err);
    },
  });
};
