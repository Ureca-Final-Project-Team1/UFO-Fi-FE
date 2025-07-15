'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Input, Button } from '@/shared';

type BankOption = { label: string; value: string; image: string };

const BANK_OPTIONS: BankOption[] = [
  { label: '카카오뱅크', value: 'kakao', image: IMAGE_PATHS.BANK_KAKAO },
  { label: '우리은행', value: 'woori', image: IMAGE_PATHS.BANK_WOORI },
  { label: '토스뱅크', value: 'toss', image: IMAGE_PATHS.BANK_TOSS },
  { label: '국민은행', value: 'kb', image: IMAGE_PATHS.BANK_KB },
  { label: '새마을금고', value: 'mg', image: IMAGE_PATHS.BANK_MG },
  { label: '신한은행', value: 'sinhan', image: IMAGE_PATHS.BANK_SINHAN },
  { label: '케이뱅크', value: 'k', image: IMAGE_PATHS.BANK_K },
  { label: 'IBK기업은행', value: 'ibk', image: IMAGE_PATHS.BANK_IBK },
  { label: '하나은행', value: 'hana', image: IMAGE_PATHS.BANK_HANA },
];

const BANK_ACCOUNT_FORMATS: Record<string, number[][]> = {
  kakao: [[4, 2, 7]],
  woori: [
    [4, 3, 6],
    [6, 2, 6],
  ],
  toss: [[4, 2, 7]],
  kb: [
    [3, 2, 6],
    [6, 2, 6],
  ],
  mg: [
    [4, 4, 4, 1],
    [3, 2, 6, 1],
  ],
  sinhan: [
    [3, 3, 7],
    [3, 2, 6],
  ],
  k: [[3, 3, 6]],
  ibk: [
    [3, 6, 2, 3],
    [3, 3, 7],
  ],
  hana: [
    [3, 6, 3],
    [3, 6, 5],
  ],
};

function formatAccountNumber(value: string, format: number[]) {
  let result = '';
  let idx = 0;
  for (let i = 0; i < format.length; i++) {
    if (value.length > idx) {
      result += value.slice(idx, idx + format[i]);
      idx += format[i];
      if (i < format.length - 1 && value.length > idx) result += '-';
    }
  }
  return result;
}

function getBestFormat(formats: number[][], value: string) {
  return formats.find((f) => f.reduce((a, b) => a + b, 0) === value.length) || formats[0];
}

export default function AccountConnectPage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [account, setAccount] = useState('');

  // 드래그 관련 상태 및 함수
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragTranslateY, setDragTranslateY] = useState(0);

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragStartY(e.clientY);
  };
  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY !== null) {
      const diff = e.clientY - dragStartY;
      setDragTranslateY(diff > 0 ? diff : 0);
    }
  };
  const handleDragEnd = () => {
    if (dragTranslateY > 80) {
      closeSheet();
    }
    setDragStartY(null);
    setDragTranslateY(0);
  };

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank);
    setIsSheetOpen(false);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    const formats = selectedBank ? BANK_ACCOUNT_FORMATS[selectedBank.value] : undefined;
    if (formats) {
      const format = getBestFormat(formats, onlyNumbers);
      setAccount(formatAccountNumber(onlyNumbers, format));
    } else {
      setAccount(onlyNumbers);
    }
  };

  const openSheet = () => {
    setIsSheetVisible(true);
    setTimeout(() => setIsSheetOpen(true), 10);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setIsSheetVisible(false), 300);
  };

  const isButtonActive = account.trim().length > 0 && selectedBank !== null;

  return (
    <div className="relative min-h-full flex flex-col bg-transparent pb-24">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute left-1 top-4 z-10 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
        aria-label="닫기 버튼"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
      <h1 className="mt-16 mb-6 text-left text-white heading-24-bold px-4">
        지구 자산 연결을 위해
        <br />
        계좌번호를 입력해 주세요
      </h1>

      <div className="flex flex-col gap-4 pt-2">
        <div
          className="w-[375px] h-[66px] mx-auto flex items-center px-5 border border-white rounded-md cursor-pointer bg-transparent text-white text-lg"
          onClick={openSheet}
        >
          {selectedBank?.label || <span className="text-gray-200">은행 선택</span>}
          {isSheetVisible && isSheetOpen ? (
            <svg
              className="ml-auto"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 15l6-6 6 6" />
            </svg>
          ) : (
            <svg
              className="ml-auto"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>
        <div className="relative">
          <Input
            placeholder="계좌번호 입력"
            className="w-[375px] h-[66px] mx-auto placeholder:text-gray-200 text-gray-200"
            value={account}
            onChange={handleAccountChange}
            disabled={!selectedBank}
          />
          {account && (
            <button
              type="button"
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition"
              onClick={() => setAccount('')}
              tabIndex={-1}
              aria-label="입력 전체 삭제"
            >
              <svg
                className="w-4 h-4 text-gray-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          )}
        </div>
        {isSheetVisible && (
          <>
            <div
              className={`fixed inset-0 bg-black/30 z-10 transition-opacity duration-300 ${isSheetOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={closeSheet}
            />
            <div
              className={`fixed left-0 right-0 bottom-14 z-20 bg-white/90 rounded-t-2xl p-6 flex flex-col items-center min-h-[320px] transition-transform duration-300 ${isSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}
              style={{ transform: `translateY(${isSheetOpen ? dragTranslateY : 0}px)` }}
            >
              <div
                className="w-12 h-1.5 bg-gray-300 rounded-full mb-6 cursor-pointer"
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerLeave={handleDragEnd}
                aria-label="시트 닫기"
              />
              <div className="grid grid-cols-3 gap-4 w-full max-w-[375px]">
                {BANK_OPTIONS.map((bank) => (
                  <button
                    key={bank.value}
                    className="flex flex-col items-center justify-center h-20 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => {
                      handleBankSelect(bank);
                      closeSheet();
                    }}
                  >
                    <Image
                      src={bank.image}
                      alt={bank.label}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mb-2 object-contain bg-white"
                    />
                    <span className="text-gray-800 text-sm font-semibold">{bank.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed left-0 right-0 bottom-19 px-4 transition-all duration-200 ${isSheetVisible ? 'z-10' : 'z-30'}`}
      >
        <Button
          className={`w-full h-[54px] mx-auto ${isButtonActive ? 'bg-[#907AD6] text-white' : 'bg-gray-500 text-white'}`}
          disabled={!isButtonActive}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
