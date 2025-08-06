'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ConfirmModal, NicknameEditor } from '@/features/mypage/components';
import { PlanEditor } from '@/features/mypage/components/PlanEditor';
import { useEditProfile } from '@/features/mypage/hooks/useEditProfile';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Title } from '@/shared';
import { useUserPlan } from '@/shared/hooks/useUserPlan';

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

  const { data: myInfo } = useMyInfo();
  const { data: userPlan } = useUserPlan();

  const [modalType, setModalType] = useState<'nickname' | 'plan' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNickname = async () => {
    const result = await saveNickname();
    if (result === true) {
      setModalType('nickname');
    } else {
      toast.error(result);
    }
  };

  const handleSavePlan = async () => {
    if (!plan) {
      toast.error('요금제를 선택해주세요.');
      return;
    }

    const result = await savePlan();
    if (result === true) {
      setModalType('plan');
    } else {
      toast.error(result);
    }
  };

  const handleModalConfirm = () => {
    setModalType(null);
    router.push('/mypage');
  };

  return (
    <div>
      <Title title="프로필 수정" iconVariant="back" />

      <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700 space-y-1">
        <div>
          <span className="font-semibold">현재 닉네임:</span> {myInfo?.nickname ?? '불러오는 중...'}
        </div>
        <div>
          <span className="font-semibold">현재 요금제:</span>{' '}
          {userPlan?.planName ?? '불러오는 중...'}
        </div>
      </div>

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
