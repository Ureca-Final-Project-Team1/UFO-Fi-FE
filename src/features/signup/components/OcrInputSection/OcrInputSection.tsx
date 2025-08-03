'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { plansAPI, Carrier } from '@/api';
import { OCRInputSectionProps, ocrInputVariants, PlanCombo, useOCRToGptMutation } from '@/features';
import {
  Button,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  getMobileDataTypeDisplay,
} from '@/shared';

const VALID_CARRIERS = ['SKT', 'LGU', 'KT'] as const;

export const OCRInputSection = ({
  className,
  control,
  errors,
  setValue,
  plans,
  setPlans,
  setMaxData,
  setNetworkType,
  isLoading,
  setIsLoading,
  setForm,
}: OCRInputSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevCarrier = useRef('');
  const [planNameOCR, setPlanNameOCR] = useState('');
  const [carrierOCR, setCarrierOCR] = useState('');
  const watchedCarrier = useWatch({
    control,
    name: 'carrier',
  });
  const { mutate: runOCRAndGPT } = useOCRToGptMutation((result) => {
    setPlanNameOCR(result[0]);
    setCarrierOCR(result[1]);
    setIsLoading(false);
  });

  useEffect(() => {
    const updatePlans = async () => {
      if (!watchedCarrier || watchedCarrier === prevCarrier.current) return;

      setIsLoading(true);
      try {
        const response = await plansAPI.getByCarrier(watchedCarrier);
        setPlans(response);
        setValue('planName', '');
        setForm({ planName: '' });
        setMaxData(null);
        setNetworkType('');
        if (!response || response.length === 0) {
          toast.error('해당 통신사의 요금제를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('요금제 불러오기 오류:', error);
        toast.error('요금제 조회에 실패했습니다.');
        setPlans([]);
      } finally {
        setIsLoading(false);
      }

      prevCarrier.current = watchedCarrier;
    };

    updatePlans();
  }, [watchedCarrier, setValue, setPlans, setForm, setMaxData, setNetworkType, setIsLoading]);

  useEffect(() => {
    if (carrierOCR) {
      const matched = VALID_CARRIERS.find(
        (c) => carrierOCR.toUpperCase().includes(c) || (c === 'LGU' && carrierOCR.includes('LG')),
      );
      if (matched) {
        setValue('carrier', matched as Carrier);
        setForm({ carrier: matched as Carrier });
      } else {
        toast.error('인식된 통신사가 유효하지 않습니다.');
      }
    }

    if (planNameOCR) {
      setValue('planName', planNameOCR, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      const selected = plans.find((p) => p.planName === planNameOCR);

      if (selected) {
        setMaxData(selected.sellMobileDataCapacityGB);
        setNetworkType(selected.mobileDataType.replace(/^_/, ''));
      } else {
        setMaxData(null);
        setNetworkType('');
        toast.error('요금제를 찾을 수 없습니다. 직접 선택해주세요.');
      }
    }
  }, [carrierOCR, planNameOCR, plans, setValue, setForm, setMaxData, setNetworkType]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);
    runOCRAndGPT(formData);
  };

  return (
    <div className={`flex flex-col gap-5 w-full ${className}`}>
      {/* 통신사 */}
      <div className="w-full">
        <label className={ocrInputVariants.label}>
          통신사 정보
          {errors.carrier && <p className={ocrInputVariants.errorText}>{errors.carrier.message}</p>}
        </label>
        <Controller
          name="carrier"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue('planName', '');
                setForm({ carrier: value as Carrier, planName: '' });
                setMaxData(null);
                setNetworkType('');
              }}
              disabled={isLoading}
            >
              <SelectTrigger className={ocrInputVariants.selectTrigger}>
                {field.value ? (
                  <SelectValue />
                ) : (
                  <span className="text-[16px] text-gray-400">통신사 선택</span>
                )}
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="SKT">SKT</SelectItem>
                <SelectItem value="LGU">LG U+</SelectItem>
                <SelectItem value="KT">KT</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* 요금제 */}
      <div className="w-full">
        <label className={ocrInputVariants.label}>
          요금제 정보
          {errors.planName && (
            <p className={ocrInputVariants.errorText}>{errors.planName.message}</p>
          )}
        </label>
        <Controller
          name="planName"
          control={control}
          render={({ field }) => (
            <PlanCombo
              value={field.value}
              planNames={plans.map((p) => p.planName)}
              onSelect={(value) => {
                field.onChange(value);
                setForm({ planName: value });
                const selected = plans.find((p) => p.planName === value);
                if (selected) {
                  setMaxData(selected.sellMobileDataCapacityGB);
                  setNetworkType(getMobileDataTypeDisplay(selected.mobileDataType));
                }
              }}
              disabled={isLoading}
            />
          )}
        />
      </div>

      {/* OCR 버튼 */}
      <div className="w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="pb-4">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={ocrInputVariants.ocrButton}
            variant="primary"
            disabled={isLoading}
          >
            <div className={ocrInputVariants.ocrIconWrapper}>
              <Icon name="Focus" />
              <p>캡처 이미지로 요금제 자동 입력</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
