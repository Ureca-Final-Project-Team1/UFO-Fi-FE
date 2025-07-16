'use client';

import { useState } from 'react';

import PasswordPad from '@/features/payment/components/PasswordPad';
import { PaymentCancellationModal } from '@/features/payment/components/PaymentCancellationModal';
import { Title } from '@/shared/ui';

export default function PaymentPasswordPage() {
  const [step, setStep] = useState<'register' | 'confirm'>('register');
  const [registeredPw, setRegisteredPw] = useState('');
  const [error, setError] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 등록 단계: 비밀번호 저장 후 확인 단계로 이동
  const handleRegisterComplete = (pw: string) => {
    setRegisteredPw(pw);
    setStep('confirm');
    setError('');
    setErrorCount(0);
  };

  // 확인 단계: 입력값이 등록된 비밀번호와 일치하는지 확인
  const handleConfirmComplete = (pw: string) => {
    if (pw === registeredPw) {
      setError('');
      alert('비밀번호가 정상적으로 등록되었습니다!');
      // TODO: 실제 등록 처리 및 페이지 이동
    } else {
      setStep('confirm');
      setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      setErrorCount((c) => c + 1);
    }
  };

  const handleDelete = () => {};
  const handleClear = () => {};

  return (
    <div className="w-full  text-white px-4 py-6 space-y-8">
      <Title
        title="간편비밀번호 등록"
        iconVariant="back"
        onClick={() => setShowCancelModal(true)}
      />
      <div className="flex-1 flex items-center justify-center">
        <PasswordPad
          key={step === 'register' ? 'register' : `confirm-${errorCount}`}
          onComplete={step === 'register' ? handleRegisterComplete : handleConfirmComplete}
          onDelete={handleDelete}
          onClear={handleClear}
          maxLength={6}
          title={
            step === 'register'
              ? '간편비밀번호 6자리를 등록해주세요'
              : '비밀번호를 한 번 더 입력해주세요'
          }
          subtitle={
            step === 'register' ? (
              <>
                결제 시 사용할 비밀번호입니다.
                <br />
                (최초 1회 등록)
              </>
            ) : (
              '동일한 비밀번호를 입력해 주세요.'
            )
          }
        />
      </div>
      {error && <div className="text-center text-red-400 font-bold">{error}</div>}
      {showCancelModal && (
        <PaymentCancellationModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onCancel={() => setShowCancelModal(false)}
          onConfirm={() => {
            // TODO: 나가기 로직 추가
            setShowCancelModal(false);
          }}
        />
      )}
    </div>
  );
}
