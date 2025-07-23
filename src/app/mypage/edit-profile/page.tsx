'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmModal, NicknameEditor, PlanEditor } from '@/features/mypage/components';
import { useEditProfile } from '@/features/mypage/hooks/useEditProfile';
import { Title } from '@/shared';

export default function EditProfilePage() {
  const router = useRouter();
  const {
    nickname,
    setNickname,
    carrier,
    setCarrier,
    plan,
    setPlan,
    plans,
    status,
    error,
    saveNickname,
    savePlan,
  } = useEditProfile();
  const [modalType, setModalType] = useState<'nickname' | 'plan' | null>(null);

  const handleSaveNickname = async () => {
    if (await saveNickname()) setModalType('nickname');
  };

  const handleSavePlan = async () => {
    if (await savePlan()) setModalType('plan');
  };

  const handleModalConfirm = () => {
    setModalType(null);
    router.push('/mypage');
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Title title="프로필 수정" iconVariant="back" />
      <div className="mx-4 mt-6 flex flex-col gap-8">
        <NicknameEditor
          nickname={nickname}
          setNickname={setNickname}
          onSave={handleSaveNickname}
          isLoading={status === 'loading'}
        />
        <PlanEditor
          carrier={carrier}
          setCarrier={setCarrier}
          plan={plan}
          setPlan={setPlan}
          plans={plans}
          onSave={handleSavePlan}
          isLoading={status === 'loading'}
          error={error}
        />
      </div>
      <ConfirmModal
        isOpen={!!modalType}
        onClose={handleModalConfirm}
        title={modalType === 'nickname' ? '닉네임 변경' : '요금제 변경'}
        description={
          modalType === 'nickname'
            ? '닉네임이 성공적으로 변경되었습니다!'
            : '요금제가 성공적으로 변경되었습니다!'
        }
        primaryButtonText="확인"
        onPrimaryClick={handleModalConfirm}
      />
    </div>
  );
}
