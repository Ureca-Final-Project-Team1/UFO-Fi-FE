import { cn } from '@/utils/utils';

import { Input } from './Input';

export function BasicInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      {...props}
      className={cn(
        'bg-white text-black placeholder-gray-400 border border-gray-300 rounded-md',
        props.className,
      )}
    />
  );
}
