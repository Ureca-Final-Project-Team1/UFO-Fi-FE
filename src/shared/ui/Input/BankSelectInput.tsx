import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils'; // class 병합 함수

interface BankSelectInputProps {
  selectedBank?: string;
  onClick?: () => void;
  className?: string;
}

export function BankSelectInput({ selectedBank, onClick, className }: BankSelectInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between px-4 py-2 bg-[#030824] border border-white/20 text-white rounded-md',
        className,
      )}
    >
      <span>{selectedBank || '은행 선택'}</span>
      <ChevronDown className="size-4 text-white" />
    </button>
  );
}
