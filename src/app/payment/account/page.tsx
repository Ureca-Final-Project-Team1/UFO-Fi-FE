'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Title, Input, Button } from '@/shared';

type BankOption = { label: string; value: string };

const BANK_OPTIONS: BankOption[] = [
  { label: '농협은행', value: 'nh' },
  { label: '국민은행', value: 'kb' },
  { label: '신한은행', value: 'sh' },
  { label: '우리은행', value: 'woori' },
  { label: '하나은행', value: 'hana' },
  { label: '카카오뱅크', value: 'kakao' },
  { label: 'IBK기업은행', value: 'ibk' },
  { label: 'SC제일은행', value: 'sc' },
  { label: '씨티은행', value: 'citi' },
];

export default function AccountConnectPage() {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [account, setAccount] = useState('');

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank);
    setIsSheetOpen(false);
  };

  const isButtonActive = account.trim().length > 0 && selectedBank !== null;

  return (
    <div className="relative min-h-full flex flex-col bg-transparent pb-24">
      <Title
        title="지구 자산 연결을 위해 계좌번호를 입력해 주세요"
        iconVariant="close"
        onClick={() => router.back()}
      />

      <div className="flex flex-col gap-4 pt-2">
        <Input
          placeholder="계좌번호 입력"
          className="w-[375px] h-[66px] mx-auto placeholder:text-gray-200 text-gray-200"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <div
          className="w-[375px] h-[66px] mx-auto flex items-center px-5 border border-white rounded-md cursor-pointer bg-transparent text-white text-lg"
          onClick={() => setIsSheetOpen(true)}
        >
          {selectedBank?.label || <span className="text-gray-200">은행 선택</span>}
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
        </div>
      </div>

      {/* 바텀시트 */}
      {isSheetOpen && (
        <>
          {/* 오버레이 */}
          <div className="fixed inset-0 bg-black/30 z-10" onClick={() => setIsSheetOpen(false)} />
          <div className="fixed left-0 right-0 bottom-0 z-20 bg-white/90 rounded-t-2xl p-6 flex flex-col items-center animate-slide-up min-h-[320px]">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-6" />
            <div className="grid grid-cols-3 gap-4 w-full max-w-[375px]">
              {BANK_OPTIONS.map((bank) => (
                <button
                  key={bank.value}
                  className="flex flex-col items-center justify-center h-20 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                  onClick={() => handleBankSelect(bank)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 mb-2" />
                  <span className="text-gray-800 text-sm font-semibold">{bank.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="absolute left-0 right-0 bottom-0 px-4 pb-4 bg-transparent">
        <Button
          className={`w-[350px] h-[54px] mx-auto ${isButtonActive ? 'bg-[#907AD6] text-white' : 'bg-gray-500 text-white'}`}
          disabled={!isButtonActive}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
