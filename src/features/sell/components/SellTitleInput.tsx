import { Input } from '@/shared';

interface Props {
  title: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export function SellTitleInput({ title, onChange, isValid }: Props) {
  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-1">
        <Input
          value={title}
          onChange={(e) => onChange(e.target.value)}
          placeholder="글 제목을 입력해주세요."
          variant="whiteBorder"
          maxLength={15}
          error={!isValid && title ? '제목은 1~15자 이내여야 합니다.' : undefined}
        />
        {title && (
          <div
            className={`text-xs text-right ${title.length === 15 ? 'text-red-400' : 'text-white/60'}`}
          >
            {title.length}/15
          </div>
        )}
      </div>
    </div>
  );
}
