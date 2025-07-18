'use client';

import { useState } from 'react';

import { useOCRToGptMutation } from '@/hooks/useOCRToGptMutation';
import { planOCR } from '@/service/ocr';

export default function OCRTestPage() {
  const [fileName, setFileName] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [planName, setPlanName] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutate: runOCRAndGPT } = useOCRToGptMutation((result) => {
    setPlanName(result);
    setLoading(false);
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      // 1. OCR 먼저 실행
      const extracted = await planOCR(formData);
      setOcrText(extracted);

      // 2. GPT 분석 실행
      runOCRAndGPT(formData);
    } catch (err) {
      console.error(err);
      alert('OCR 또는 GPT 처리 실패');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">🧠 OCR + GPT 분석 페이지</h1>

      <label className="block mb-4">
        <span className="text-gray-700">이미지 업로드</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>

      {fileName && <p className="text-sm text-gray-600 mb-2">📄 선택한 파일: {fileName}</p>}

      {loading ? (
        <p className="text-blue-600 mt-4">OCR + GPT 분석 중입니다...</p>
      ) : (
        <>
          {ocrText && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">📄 추출된 텍스트 (OCR)</h2>
              <pre className="whitespace-pre-wrap text-black bg-gray-100 p-4 rounded border border-gray-200 text-sm">
                {ocrText}
              </pre>
            </div>
          )}

          {planName && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">💡 GPT 분석 결과</h2>
              <p className="text-md bg-green-50 text-green-800 border border-green-200 rounded px-4 py-2">
                요금제 이름: <strong>{planName}</strong>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
