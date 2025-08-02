'use client';

import React, { useCallback, useEffect, useState, ComponentProps } from 'react';

import { reportAPI } from '@/api';
import { HttpStatusCode } from '@/api/types/api';

import { Modal } from './Modal';
import { RadioGroup } from '../Radio';
import { CompleteModal } from './CompleteModal';
import { ReportReason } from './Modal.types';
import { Input } from '../Input';
import {
  modalConfig,
  inputVariants,
  inputConfig,
  completeModalConfig,
  errorMessages,
} from './ReportModalVariants';
import '@/styles/globals.css';

type ReportedModalProps = ComponentProps<'div'> & {
  postOwnerUserId?: number;
  postId?: number;
  isOpen?: boolean;
  onClose?: () => void;
};

export const ReportedModal: React.FC<ReportedModalProps> = (props) => {
  const { postOwnerUserId = 0, postId = 0, isOpen = false, onClose = () => {}, ...rest } = props;

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
            setError(response.message ?? errorMessages.default);
            setFaultOpen(true);
          }
        } catch (e) {
          const errorMessage = e instanceof Error && e.message ? e.message : errorMessages.unknown;
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
        headerAlign={modalConfig.headerAlign}
        title={modalConfig.title}
        description={modalConfig.description}
        imageSrc={modalConfig.imageSrc}
        imageAlt={modalConfig.imageAlt}
        imagePosition={modalConfig.imagePosition}
        imageSize={modalConfig.imageSize}
        type={modalConfig.type}
        hasCloseButton={modalConfig.hasCloseButton}
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
          color={modalConfig.color}
        />

        {selectedOption === 'ETC' && (
          <Input
            className={inputVariants()}
            placeholder={inputConfig.placeholder}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
      </Modal>

      <CompleteModal
        title={completeModalConfig.success.title}
        description={completeModalConfig.success.description}
        isOpen={completeOpen}
        onClose={() => setCompleteOpen(false)}
      />

      <CompleteModal
        title={completeModalConfig.error.title(error)}
        description={completeModalConfig.error.description}
        isOpen={faultOpen}
        onClose={() => setFaultOpen(false)}
      />
    </div>
  );
};
