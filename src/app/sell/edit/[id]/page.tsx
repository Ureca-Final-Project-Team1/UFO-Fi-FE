'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { ApiResponse, sellAPI } from '@/api';
import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { useEditContext } from '@/features/exchange/components/EditProvider';
import { SellCapacitySlider } from '@/features/sell/components/SellCapacitySlider';
import { SellTotalPrice } from '@/features/sell/components/SellTotalPrice';
import { getSellErrorMessages } from '@/features/sell/utils/sellValidation';
import { Icon, Input, TitleWithRouter, Button, PriceInput } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';
import { handleApiAction } from '@/utils/handleApiAction';

export default function SellEditPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);
  const { postData } = useEditContext();
  const isMobile = useViewportStore((state) => state.isMobile);
  const [value, setValue] = useState<number[]>([1]);
  const [titleInput, setTitleInput] = useState('');
  const [pricePerGB, setPricePerGB] = useState(90);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // postData가 로드되면 상태 업데이트
  useEffect(() => {
    if (postData) {
      setTitleInput(postData.title);
      setPricePerGB(postData.zetPerUnit);
      setValue([postData.capacity]);
    }
  }, [postData]);

  // postData가 없으면 로딩 상태
  if (!postData) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-white">게시글 정보를 불러오는 중...</div>
      </div>
    );
  }

  const maxCapacity = 10;
  const sellCapacity = value[0];
  const totalPrice = sellCapacity * pricePerGB;

  // 유효성 검사
  const isValidTitle = titleInput.trim().length >= 2 && titleInput.length <= 15;
  const isValidPrice = pricePerGB > 0 && pricePerGB <= 9999 && totalPrice >= 1;
  const isValidCapacity = sellCapacity > 0 && sellCapacity <= maxCapacity;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Math.max(0, parseInt(e.target.value) || 0);
    setPricePerGB(newPrice);
  };

  // 수정 제출
  const handleSubmit = async () => {
    setIsSubmitting(true);

    await handleApiAction({
      apiCall: () =>
        sellAPI.updatePost(postId, {
          title: titleInput.trim(),
          zetPerUnit: pricePerGB,
          sellMobileDataCapacityGb: sellCapacity,
        }) as Promise<ApiResponse>,
      successMessage: '게시물이 수정되었습니다!',
      errorMessage: '게시물 수정 중 오류가 발생했습니다.',
      onSuccess: () => router.push('/exchange'),
      onError: () => setIsSubmitting(false),
    });

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-full w-full justify-center">
      <TitleWithRouter title="데이터 판매 수정" iconVariant="back" />
      <div className="relative rounded-[20px] space-y-6 pb-16 xs:pb-32">
        {/* 거래명세서 타이틀 */}
        <div className="flex items-center space-x-3">
          <Icon name="FilePenLine" color="white" />
          <h2 className="text-white font-bold text-lg">거래명세서 수정</h2>
        </div>

        {/* 통신사 + 제목 입력 */}
        <div className="rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 px-0.5 bg-white/50 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-1">
              <Icon
                src={ICON_PATHS[postData.carrier as keyof typeof ICON_PATHS] || ICON_PATHS['LGU']}
              />
            </div>

            <div className="flex-1">
              <Input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="글 제목을 입력해주세요."
                variant="blueFill"
                maxLength={15}
                error={getSellErrorMessages.title(titleInput, isValidTitle)}
              />
            </div>
          </div>
          <div
            className={`text-xs text-right ${
              titleInput.length === 15 ? 'text-red-400' : 'text-white/60'
            }`}
          >
            {titleInput.length}/15
          </div>
        </div>

        {/* 판매 용량 설정 슬라이더 */}
        <SellCapacitySlider
          value={value}
          setValue={setValue}
          maxCapacity={maxCapacity}
          errorMessage={getSellErrorMessages.price(isValidPrice, pricePerGB)}
        />

        {/* 1GB당 가격 입력 */}
        <div className="flex justify-center items-center gap-3.5">
          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed">
            1GB 당
          </div>

          <div className="w-28 h-10 flex justify-center items-center px-2">
            <PriceInput
              value={String(pricePerGB)}
              onChange={(e) => handlePriceChange(e)}
              placeholder="금액"
              variant="blueFill"
            />
          </div>

          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed">ZET</div>
        </div>

        {/* 총 판매 금액 표시 */}
        <SellTotalPrice
          sellCapacity={sellCapacity}
          totalPrice={totalPrice}
          isValidPrice={isValidPrice}
        />

        {/* 수정 버튼 */}
        <div className="w-full mx-auto pt-2 flex justify-end relative">
          <Button
            size={isMobile ? 'default' : 'lg'}
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isValidTitle || !isValidPrice || !isValidCapacity || isSubmitting}
            className="px-6 py-3"
          >
            {isSubmitting ? '수정 중...' : '수정완료'}
          </Button>
        </div>

        {/* 하단 캐릭터 */}
        <Image
          src={IMAGE_PATHS.AL_SELL}
          alt="판매 우주인"
          width={200}
          height={200}
          className="absolute bottom-12 xs:-bottom-28 left-0"
          priority
        />
      </div>
    </div>
  );
}
