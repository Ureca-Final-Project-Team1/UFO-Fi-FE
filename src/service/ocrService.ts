export const ocrService = async (formData: FormData): Promise<string> => {
  const response = await fetch('/api/ocr', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('OCR failed');
  }

  const data = await response.json();
  return data.text;
};
