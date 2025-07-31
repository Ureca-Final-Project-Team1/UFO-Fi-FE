'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Avatar, Button, Progress } from '@/shared';

interface SignalCardProps {
  userId: string;
  profileImageUrl: string | undefined;
  zetAmount: number;
  availableData: number;
  maxData: number;
}

export default function SignalCard({
  userId,
  profileImageUrl,
  zetAmount,
  availableData,
  maxData,
}: SignalCardProps) {
  const router = useRouter();

  return (
    <div
      className="rounded-xl shadow-lg border-[4px] w-full max-w-[620px] mx-auto min-w-0"
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
          className="caption-8-regular"
          style={{
            color: 'var(--color-badge-hover-dark)',
            opacity: 0.6,
          }}
        >
          EARTH-BASED FIELD IDENTIFICATION
        </p>
        <hr className="my-1 border-black/30" />
      </div>

      <div className="flex justify-between items-start px-2 sm:px-4 md:px-6 pb-3 gap-2 sm:gap-3 md:gap-5">
        {/* 왼쪽 캐릭터 */}
        <div className="flex flex-col items-center shrink-0">
          <Avatar
            size="sm"
            className="border sm:w-[64px] sm:h-[64px] md:w-[80px] md:h-[80px]"
            variant="default"
          >
            <Image
              src={profileImageUrl || IMAGE_PATHS.AVATAR}
              alt="지구인"
              width={48}
              height={48}
              className="rounded-md w-full h-full object-cover sm:w-[64px] sm:h-[64px] md:w-[80px] md:h-[80px]"
              style={{ borderColor: 'var(--chart-4)' }}
            />
          </Avatar>
          <button
            className="w-[4rem] sm:w-[5rem] mt-2 rounded-md text-[10px] sm:text-xs text-white py-0.5 px-1"
            style={{ backgroundColor: 'var(--chart-4)' }}
          >
            🌱 지구 새싹
          </button>
        </div>

        {/* 가운데 텍스트 */}
        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="body-16-bold sm:body-20-bold text-black truncate">
              <span className="font-bold">{userId ? userId : '지구인'}</span>
            </span>
          </div>

          <div className="flex items-center caption-10-bold sm:caption-12-bold text-gray-800">
            <span className="truncate">이번 달 판매 가능 용량</span>
          </div>

          <Progress usedStorage={availableData} totalStorage={maxData} size="sm" />
          <hr className="border-black/30" />

          <div className="caption-10-bold sm:caption-12-bold flex flex-col text-gray-800">
            <span>보유중인 ZET</span>
            <div className="flex justify-between items-center gap-1 sm:gap-2">
              <span className="body-14-bold sm:body-16-bold font-bold text-chart-4 truncate">
                {zetAmount} ZET
              </span>
              <Link href="/charge">
                <button className="whitespace-nowrap caption-12-medium sm:body-14-medium rounded-md px-2 sm:px-4 py-1 sm:py-2 flex items-center justify-center exploration-button text-xs sm:text-sm">
                  충전
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 오른쪽 QR & 칩 */}
        <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
          <Button
            variant="outline"
            size="compact"
            className="text-gray-800 caption-6-medium sm:caption-8-medium h-6 sm:h-7 px-1 py-1 whitespace-nowrap text-[8px] sm:text-[10px]"
            onClick={() => router.push('/mypage/edit-profile')}
          >
            ✏️&nbsp;프로필 수정
          </Button>
          <Image
            src={IMAGE_PATHS.QR}
            alt="QR 코드"
            width={48}
            height={48}
            className="sm:w-[64px] sm:h-[64px] md:w-[80px] md:h-[80px]"
          />
          <Image
            src={IMAGE_PATHS.IC}
            alt="칩"
            width={32}
            height={32}
            className="mt-1 sm:mt-2 sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]"
          />
        </div>
      </div>
    </div>
  );
}
