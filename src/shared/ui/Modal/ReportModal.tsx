'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { reportAPI } from '@/api';
import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';
import { RadioGroup } from '../Radio';
import { CompleteModal } from './CompleteModal';
import { ReportedModalProps } from './Modal.types';

export const ReportedModal: React.FC<ReportedModalProps> = ({
  postOwnerUserId,
  postId,
  isOpen,
  onClose,
}) => {
  const reportOption: string[] = ['욕설/혐오 표현 사용', '도배/홍보(타 플랫폼 유도 등)', '기타'];
  const [completeOpen, setCompleteOpen] = useState(false);
  const [faultOpen, setFaultOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setSelectedOption('');
  }, [isOpen]);

  useEffect(() => {
    if (error) {
      setFaultOpen(true);
    }
  }, [error]);

  const handleClick = useCallback(() => {
    if (selectedOption !== '') {
      const fetchReport = async () => {
        try {
          const response = await reportAPI.reportPosts({
            content: selectedOption,
            reportedUserId: postOwnerUserId,
            tradePostId: postId,
          });

          if ([200, 201, 204].includes(response.statusCode)) {
            setCompleteOpen(true);
          } else {
            setError(response.message ?? '신고 요청에 실패했습니다.');
            setFaultOpen(true);
          }
        } catch (e) {
          const errorMessage =
            e instanceof Error && e.message ? e.message : '알 수 없는 오류가 발생했습니다.';
          setError(errorMessage);
          setFaultOpen(true);
          throw e;
        }
      };

      fetchReport();
    }
  }, [selectedOption, postOwnerUserId, postId]);

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
        <RadioGroup
          options={reportOption}
          value={selectedOption}
          onValueChange={setSelectedOption}
          color="black"
        />
      </Modal>
      <CompleteModal
        title="신고 접수가 완료되었어요!"
        description={`신고해주신 내용을 외계 요원이\n꼼꼼히 확인하고 조치할 예정입니다.`}
        isOpen={completeOpen}
        onClose={() => setCompleteOpen(false)}
      />
      <CompleteModal
        title={error ?? '에러가 발생했습니다.'}
        description={`잠시 후 다시\n이용해주시길 바랍니다.`}
        isOpen={faultOpen}
        onClose={() => setFaultOpen(false)}
      />
    </>
  );
};
