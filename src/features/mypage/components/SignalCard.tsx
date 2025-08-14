'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { achievementsAPI } from '@/backend/services/mypage/achievement';
import { IMAGE_PATHS } from '@/constants/images';
import { formatZetAmount } from '@/features/common/components/ZetDisplay';
import { generateQRCodeDataURL } from '@/features/profile/utils/qrCodeUtils';
import { generateQRCodeValue } from '@/features/profile/utils/shareUtils';
import { Button, Progress } from '@/shared';

import { HonorificChip } from './HonorificChip';
import { Honorific } from '../types/Achievement';

interface SignalCardProps {
  userId: string;
  profileImageUrl: string | undefined;
  zetAmount: number;
  availableData: number;
  maxData: number;
  honorifics: Honorific[];
}

export default function SignalCard({
  userId,
  profileImageUrl,
  zetAmount,
  availableData,
  maxData,
  honorifics: initialHonorifics,
}: SignalCardProps) {
  const router = useRouter();
  const [honorifics, setHonorifics] = useState<Honorific[]>([]);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isQRLoading, setIsQRLoading] = useState(true);

  // QR코드 동적 생성
  useEffect(() => {
    const generateUserQR = async () => {
      try {
        setIsQRLoading(true);
        const profileUrl = generateQRCodeValue(userId);
        const dataURL = await generateQRCodeDataURL(profileUrl, {
          size: 80,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error('QR 코드 생성 실패:', error);
        setQrCodeDataURL('');
      } finally {
        setIsQRLoading(false);
      }
    };

    if (userId) {
      generateUserQR();
    }
  }, [userId]);

  useEffect(() => {
    if (initialHonorifics.length === 0) {
      setHonorifics([]);
      return;
    }

    const hasActive = initialHonorifics.some((h) => h.isActive);
    if (hasActive) {
      setHonorifics(initialHonorifics);
    } else {
      setHonorifics(
        initialHonorifics.map((h, index) => ({
          ...h,
          isActive: index === 0,
        })),
      );
    }
  }, [initialHonorifics]);

  const formattedZet = formatZetAmount(zetAmount);
  const activeHonorific = honorifics.find((h) => h.isActive);

  return (
    <section
      className="rounded-xl shadow-lg border-[4px] mx-auto overflow-hidden p-2"
      style={{
        borderColor: 'var(--chart-4)',
        backgroundColor: 'var(--color-background-card)',
        width: '85%',
        maxWidth: '20rem',
        minWidth: '19rem',
        aspectRatio: '1.5/1',
      }}
      role="region"
      aria-labelledby="signal-card-title"
    >
      <div className="w-full h-full flex flex-col justify-center mb-2">
        {/* 헤더 */}
        <header
          className="text-center flex flex-col justify-center"
          style={{ height: '20%', padding: '1% 2%' }}
        >
          <h2
            id="signal-card-title"
            className="font-black leading-tight"
            style={{
              color: 'var(--color-badge-hover-dark)',
              fontSize: '14px',
            }}
          >
            UPHONIAN SIGNAL CARD
          </h2>
          <p
            className="mt-[0.5%]"
            style={{
              color: 'var(--color-badge-hover-dark)',
              opacity: 0.6,
              fontSize: '8px',
            }}
          >
            EARTH-BASED FIELD IDENTIFICATION
          </p>
          <hr className="mt-[1%] border-black/30" />
        </header>

        {/* 메인 컨텐츠 */}
        <div className="flex items-stretch gap-3 min-h-0 flex-1" style={{ padding: '2%' }}>
          {/* 왼쪽 프로필 */}
          <div className="flex flex-col items-center flex-shrink-0 w-18">
            <div className="relative">
              <div
                className="border rounded-md overflow-hidden w-18 h-18"
                style={{ borderColor: 'var(--chart-4)' }}
              >
                <Image
                  src={profileImageUrl || IMAGE_PATHS.AVATAR}
                  alt={`${userId}의 프로필 이미지`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 칭호 */}
            <div className="mt-2">
              {activeHonorific ? (
                <HonorificChip
                  honorifics={honorifics}
                  onSelectHonorific={async (name: string) => {
                    setHonorifics((prev) =>
                      prev.map((h) => ({
                        ...h,
                        isActive: h.name === name,
                      })),
                    );

                    try {
                      await achievementsAPI.updateUserHonorific(name);
                    } catch (error) {
                      console.error('칭호 변경 실패:', error);
                      setHonorifics(initialHonorifics);
                      toast.error('칭호 변경에 실패했습니다. 다시 시도해주세요.');
                    }
                  }}
                  className="w-full px-1 py-1 rounded text-white font-medium text-center truncate text-xs"
                  style={{ backgroundColor: 'var(--chart-4)' }}
                >
                  {activeHonorific.name}
                </HonorificChip>
              ) : (
                <div className="w-full px-1 py-1 rounded text-xs text-gray-500 bg-gray-100 font-medium border border-gray-200 text-center truncate">
                  신분 미확인
                </div>
              )}
            </div>
          </div>

          {/* 가운데 사용자 정보 */}
          <div className="flex-1 min-w-0 px-1 gap-1">
            <div className="flex justify-between items-start mb-1 gap-2">
              <h3 className="font-bold text-black truncate flex-1 text-sm">{userId || '지구인'}</h3>
            </div>

            <div className="font-bold text-gray-800 text-[11px]">
              <span className="block truncate mb-1">이번 달 판매 가능 용량</span>
              <Progress
                usedStorage={availableData}
                totalStorage={maxData}
                size="sm"
                aria-label={`데이터 사용량: ${availableData}/${maxData}GB`}
              />
            </div>

            <hr className="border-black/20 my-2" />

            <div className="font-bold flex flex-col text-gray-800 space-y-1">
              <span className="text-xs">보유중인 ZET</span>
              <div className="flex justify-between items-center gap-2">
                <span className="font-bold text-chart-4 truncate flex-1 text-sm">
                  {formattedZet} ZET
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽 QR & 액션 */}
          <div className="flex flex-col items-end justify-start flex-shrink-0 w-16 space-y-1 h-full overflow-hidden">
            <Button
              type="button"
              variant="outline"
              size="compact"
              className="text-gray-800 whitespace-nowrap w-full text-xs h-6 px-1 py-0.5 rounded-full flex-shrink-0"
              onClick={() => router.push('/mypage/edit-profile')}
              aria-label="프로필 수정하기"
            >
              ✏️ 수정
            </Button>

            {/* QR코드 */}
            <div className="w-15 h-15 bg-white rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0">
              {isQRLoading ? (
                <div className="animate-spin w-7 h-7 border border-gray-300 border-t-gray-600 rounded-full" />
              ) : qrCodeDataURL ? (
                <Image
                  src={qrCodeDataURL}
                  alt={`${userId}의 프로필 QR 코드`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded-lg p-1"
                  unoptimized
                />
              ) : (
                <Image
                  src={IMAGE_PATHS.QR}
                  alt="기본 QR 코드"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              )}
            </div>

            <div className="flex-1 flex items-end justify-center min-h-0">
              <Image
                src={IMAGE_PATHS.IC}
                alt="신분증 칩"
                width={50}
                height={50}
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
