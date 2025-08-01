'use client';

import React, { useCallback, useEffect, useState, ComponentProps } from 'react';

import { reportAPI } from '@/api';
import { HttpStatusCode } from '@/api/types/api';
import { IMAGE_PATHS } from '@/constants/images';

import { Modal } from './Modal';
import { RadioGroup } from '../Radio';
import { CompleteModal } from './CompleteModal';
import { ReportReason } from './Modal.types';
import { Input } from '../Input';
import '@/styles/globals.css';

type ReportedModalProps = ComponentProps<'div'> & {
  postOwnerUserId: number;
  postId: number;
  isOpen?: boolean;
  onClose?: () => void;
};

export const ReportedModal: React.FC<ReportedModalProps> = (props) => {
  const { postOwnerUserId, postId, isOpen = false, onClose = () => {}, ...rest } = props;

  const reportOption = Object.entries(ReportReason).map(([key, label]) => ({
    label,
    value: key,
  }));

  const [completeOpen, setCompleteOpen] = useState(false);
  const [faultOpen, setFaultOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<keyof typeof ReportReason | ''>('');
  const [customReason, setCustomReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedOption('');
      setCustomReason('');
    }
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
          const content =
            selectedOption === 'ETC'
              ? customReason.trim()
              : ReportReason[selectedOption as keyof typeof ReportReason];

          const response = await reportAPI.reportPosts({
            content,
            reportedUserId: postOwnerUserId,
            tradePostId: postId,
          });

          if (
            response.statusCode === HttpStatusCode.OK ||
            response.statusCode === HttpStatusCode.CREATED ||
            response.statusCode === HttpStatusCode.NO_CONTENT
          ) {
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
  }, [selectedOption, customReason, postOwnerUserId, postId]);

  return (
    <div {...rest}>
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
        primaryButtonDisabled={
          !selectedOption || (selectedOption === 'ETC' && customReason.trim() === '')
        }
      >
        <RadioGroup
          options={reportOption.map((opt) => opt.label)}
          value={ReportReason[selectedOption as keyof typeof ReportReason] ?? ''}
          onValueChange={(label) => {
            const matched = Object.entries(ReportReason).find(([, v]) => v === label);
            setSelectedOption((matched?.[0] as keyof typeof ReportReason) ?? '');
          }}
          color="black"
        />

        {selectedOption === 'ETC' && (
          <Input
            className="w-full border p-2 mt-2 rounded bg-white caption-14-regular"
            placeholder="신고 사유를 입력해주세요."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
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
    </div>
  );
};
