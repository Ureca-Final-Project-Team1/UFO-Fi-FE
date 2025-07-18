'use client';

import Image from 'next/image';

import { Button } from '@/shared/ui';
import { Progress } from '@/shared/ui/Progress';

interface SignalCardProps {
  userId: string;
  profileImageUrl?: string;
  zetAmount: number;
  availableData: number; // GB
  maxData: number; // GB
}

const PROFILE_DEFAULT = '/images/avatar.png';
const QR_IMAGE = '/images/QR.png';
const IC_IMAGE = '/images/IC.png';

export default function SignalCard({
  userId,
  profileImageUrl,
  zetAmount,
  availableData,
  maxData,
}: SignalCardProps) {
  return (
    <div
      className="rounded-xl shadow-lg border-[4px] w-full max-w-[620px] mx-auto"
      style={{
        borderColor: 'var(--chart-4)',
        backgroundColor: 'var(--color-background-card)',
      }}
    >
      <div className="text-center py-2">
        <h2 className="heading-24-bold" style={{ color: 'var(--color-badge-hover-dark)' }}>
          UPHONIAN SIGNAL CARD
        </h2>
        <p
          className="caption-10-regular"
          style={{
            color: 'var(--color-badge-hover-dark)',
            opacity: 0.6,
          }}
        >
          EARTH-BASED FIELD IDENTIFICATION
        </p>
        <hr className="my-1 border-black/30" />
      </div>

      <div className="flex justify-between items-start px-4 sm:px-6 pb-3 gap-3 sm:gap-5">
        {/* 왼쪽 캐릭터 */}
        <div className="flex flex-col items-center shrink-0">
          <Image
            src={profileImageUrl || PROFILE_DEFAULT}
            alt="지구인"
            width={64}
            height={64}
            className="rounded-md border sm:w-[80px] sm:h-[80px]"
            style={{ borderColor: 'var(--chart-4)' }}
          />
          <button
            className="w-[5rem] mt-2 rounded-md text-xs text-white py-0.5"
            style={{ backgroundColor: 'var(--chart-4)' }}
          >
            🌱 지구 새싹
          </button>
        </div>

        {/* 가운데 텍스트 */}
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <span className="body-20-bold text-black">
              지구인 <span className="font-bold">{userId}</span>
            </span>
          </div>

          <div className="flex items-center caption-12-bold text-gray-800">
            <span>이번 달 판매 가능 용량</span>
          </div>

          <Progress usedStorage={availableData} totalStorage={maxData} size="sm" />
          <hr className="border-black/30" />

          <div className="caption-12-bold flex flex-col text-gray-800">
            <span>보유중인 ZET</span>
            <div className="flex items-center">
              <span className="body-16-bold font-bold text-chart-4">{zetAmount} ZET</span>
              <button className="ml-auto body-14-medium rounded-md px-4 py-2 flex items-center justify-center exploration-button">
                충전
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 QR & 칩 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button
            variant="outline"
            size="compact"
            className="text-gray-800 caption-8-medium h-7 px-1 py-1 whitespace-nowrap"
          >
            ✏️ 프로필 수정
          </Button>
          <Image
            src={QR_IMAGE}
            alt="QR 코드"
            width={64}
            height={64}
            className="sm:w-[80px] sm:h-[80px]"
          />
          <Image
            src={IC_IMAGE}
            alt="칩"
            width={40}
            height={40}
            className="mt-2 sm:w-[50px] sm:h-[50px]"
          />
        </div>
      </div>
    </div>
  );
}
