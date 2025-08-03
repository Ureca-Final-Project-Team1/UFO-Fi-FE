'use client';

import type { ProfileUser } from '@/api';
import { useProfileShare } from '@/features';
import { Modal } from '@/shared';

import { QRCodeGenerator } from './QRCodeGenerator';
import { ShareButtons } from './ShareButtons';

interface ShareModalProps {
  profile: ProfileUser;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ profile, isOpen, onClose }: ShareModalProps) {
  const { profileUrl, handleCopyLink } = useProfileShare(profile);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="공유하기"
      description="SNS를 통해서 프로필을 공유해보세요!"
      type="none"
      size="lg"
      hasCloseButton={true}
      closeButtonPosition="top-right"
      headerAlign="center"
      className="max-w-md"
    >
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
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
