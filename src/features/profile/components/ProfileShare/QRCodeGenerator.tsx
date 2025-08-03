'use client';

import { useEffect, useState } from 'react';

import { generateQRCodeDataURL } from '@/features';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

export function QRCodeGenerator({ url, size = 200 }: QRCodeGeneratorProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        setError('');
        const dataURL = await generateQRCodeDataURL(url, {
          size,
          // 색상코드로 작성해야 함
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeDataURL(dataURL);
      } catch (err) {
        setError('QR 코드 생성에 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      generateQR();
    }
  }, [url, size]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-100 rounded-lg">
        <div className="text-gray-500">QR 생성 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-[200px] h-[200px] bg-gray-100 rounded-lg">
        <div className="text-red-400 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <img src={qrCodeDataURL} alt="프로필 QR 코드" className="w-[200px] h-[200px]" />
    </div>
  );
}
