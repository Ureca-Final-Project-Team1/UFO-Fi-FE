'use client';

import React, { useCallback, useState } from 'react';

import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';
import { RadioGroup } from '../Radio';
import { CompleteModal } from './CompleteModal';

interface ReportedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportedModal: React.FC<ReportedModalProps> = ({ isOpen, onClose }) => {
  const reportOption: string[] = ['욕설/혐오 표현 사용', '도배/홍보(타 플랫폼 유도 등)', '기타'];
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = useCallback(() => {
    setIsCompleteOpen(true);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        headerAlign="left"
        title="게시글을 신고하시겠습니까?"
        description="신고 사유를 선택해주세요."
        imageSrc={IMAGE_PATHS['AL_REPORTED']}
        imageAlt="신고"
        imagePosition={{ x: 90, y: 50 }}
        imageSize={{ width: 150, height: 150 }}
        type="double"
        hasCloseButton={false}
        onPrimaryClick={handleClick}
        primaryButtonDisabled={!selectedOption}
      >
        <RadioGroup options={reportOption} onValueChange={setSelectedOption} color="black" />
      </Modal>
      <CompleteModal isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)} />
    </>
  );
};
