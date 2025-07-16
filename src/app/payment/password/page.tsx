'use client';

import { useState } from 'react';

import PasswordPad from '@/features/payment/components/PasswordPad';
import { Title } from '@/shared/ui';

export default function PaymentPasswordPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState('');

  const handleComplete = (pw: string) => {
    setPassword(pw);
    // TODO: 비밀번호 등록/검증 로직 추가
    alert(`입력된 비밀번호: ${pw}`);
  };

  const handleDelete = () => {
    // TODO: 필요시 삭제 이벤트 처리
  };

  const handleClear = () => {
    setPassword('');
  };

  return (
    <div className="w-full min-h-screen text-white px-4 py-6 space-y-8">
      <Title title="간편비밀번호 등록" iconVariant="back" />
      <div className="flex-1 flex items-center justify-center">
        <PasswordPad
          onComplete={handleComplete}
          onDelete={handleDelete}
          onClear={handleClear}
          maxLength={6}
          title="간편비밀번호 6자리를 등록해주세요"
          subtitle={
            <>
              결제 시 사용할 비밀번호입니다.
              <br />
              (최초 1회 등록)
            </>
          }
        />
      </div>
    </div>
  );
}
