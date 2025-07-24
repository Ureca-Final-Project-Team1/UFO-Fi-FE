'use client';

import type { ProfileUser } from '@/api/types/profile';
import { useProfileShare } from '@/features/profile/hooks/useProfileShare';
import { useModalStore } from '@/stores/useModalStore';

import { QRCodeGenerator } from './QRCodeGenerator';
import { ShareButtons } from './ShareButtons';

interface ProfileShareContentProps {
  profile: ProfileUser;
}

export function ProfileShareContent({ profile }: ProfileShareContentProps) {
  const { profileUrl, handleCopyLink } = useProfileShare(profile);
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal('profileShare');
  };

  return (
    <div className="space-y-6">
      {/* QR 코드 */}
      <div className="flex justify-center">
        <QRCodeGenerator url={profileUrl} />
      </div>

      {/* 스와이퍼 기반 공유 버튼들 */}
      <ShareButtons
        profile={profile}
        profileUrl={profileUrl}
        onCopyLink={handleCopyLink}
        onClose={handleClose}
      />
    </div>
  );
}
