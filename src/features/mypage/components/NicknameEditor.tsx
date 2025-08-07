import { Button, Input } from '@/shared';

interface NicknameEditorProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  onSave: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function NicknameEditor({
  nickname,
  setNickname,
  onSave,
  isLoading,
  placeholder,
}: NicknameEditorProps) {
  const isValid = nickname.length > 0 && nickname.length <= 15;

  return (
    <div>
      <h1 className="mb-4 font-semibold text-lg">닉네임 수정</h1>
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder={placeholder || '변경할 닉네임을 입력해주세요.'}
        variant="whiteBorder"
        maxLength={15}
        error={!isValid && nickname ? '닉네임은 1~15자 이내여야 합니다.' : undefined}
      />
      <Button className="w-full h-12 mt-4" disabled={!isValid || isLoading} onClick={onSave}>
        닉네임 저장
      </Button>
    </div>
  );
}
