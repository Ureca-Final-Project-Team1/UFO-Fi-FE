'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BankSelectSheet } from '@/features/payments/components/BankSelectSheet';
import { BANK_ACCOUNT_FORMATS } from '@/features/payments/constants/BankAccountFormats';
import { BankOption } from '@/features/payments/constants/BankOptions';
import { formatAccountNumber, getBestFormat } from '@/features/payments/utils/accountFormat';
import { Input, Button } from '@/shared';

export default function AccountConnectPage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [account, setAccount] = useState('');

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
        <BankSelectSheet
          isVisible={isSheetVisible}
          isOpen={isSheetOpen}
          dragTranslateY={dragTranslateY}
          onClose={closeSheet}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          handleBankSelect={(bank) => {
            handleBankSelect(bank);
            closeSheet();
          }}
        />
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
