'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { TitleWithRouter } from '@/features/common/components/TitleWithRouter';
import { ConfirmModal, NicknameEditor } from '@/features/mypage/components';
import { PlanEditor } from '@/features/mypage/components/PlanEditor';
import { useEditProfile } from '@/features/mypage/hooks/useEditProfile';

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
    setPlans,
    status,
    saveNickname,
    savePlan,
  } = useEditProfile();

  const [modalType, setModalType] = useState<'nickname' | 'plan' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNickname = async () => {
    if (await saveNickname()) setModalType('nickname');
  };

  const handleSavePlan = async () => {
    if (!plan) {
      toast.error('요금제를 선택해주세요.');
      return;
    }
    if (await savePlan()) setModalType('plan');
  };

  const handleModalConfirm = () => {
    setModalType(null);
    router.push('/mypage');
  };

  return (
    <div className="flex flex-col min-h-full w-full">
      <TitleWithRouter title="프로필 수정" iconVariant="back" />

      <div className="mt-6 flex flex-col gap-8">
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
          setPlans={setPlans}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onSave={handleSavePlan}
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
