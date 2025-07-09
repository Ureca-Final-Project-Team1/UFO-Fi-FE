import { cn } from '@/lib/utils';

import { Input } from './input';
import { CustomInputProps } from './Input.types';

interface LabeledInputProps extends CustomInputProps {
  label: string;
}

export function LabeledInput({ label, className, ...props }: LabeledInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-white">{label}</label>
      <Input
        {...props}
        placeholder="실명을 입력하세요."
        className={cn(
          'bg-white text-black placeholder-gray-400 border border-gray-300 rounded-md',
          className,
        )}
      />
    </div>
  );
}
