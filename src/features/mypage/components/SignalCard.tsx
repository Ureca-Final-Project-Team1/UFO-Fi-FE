'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Avatar, Button, Chip, Progress } from '@/shared';
import { Honorific } from '@/types/Achievement';

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
  honorifics,
}: SignalCardProps) {
  const router = useRouter();
  const handleClick = () => {};

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
          <Avatar size="md" className="border sm:w-[80px] sm:h-[80px]" variant="default">
            <Image
              src={profileImageUrl || IMAGE_PATHS.AVATAR}
              alt="지구인"
              width={64}
              height={64}
              className="rounded-md w-full h-full object-cover"
              style={{ borderColor: 'var(--chart-4)' }}
            />
          </Avatar>
          <Chip
            className="w-[5rem] mt-2 rounded-md text-xs text-white py-0.5"
            style={{ backgroundColor: 'var(--chart-4)' }}
            onClick={handleClick}
          >
            {honorifics.find((h) => h.isActive)?.name || '칭호 없음'}
          </Chip>
        </div>

        {/* 가운데 텍스트 */}
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <span className="body-20-bold text-black">
              <span className="font-bold">{userId ? userId : '지구인'}</span>
            </span>
          </div>

          <div className="flex items-center caption-12-bold text-gray-800">
            <span>이번 달 판매 가능 용량</span>
          </div>

          <Progress usedStorage={availableData} totalStorage={maxData} size="sm" />
          <hr className="border-black/30" />

          <div className="caption-12-bold flex flex-col text-gray-800">
            <span>보유중인 ZET</span>
            <div className="flex justify-between items-center gap-2">
              <span className="body-16-bold font-bold text-chart-4">{zetAmount} ZET</span>
              <Link href="/charge">
                <button className="ml-auto whitespace-nowrap body-14-medium rounded-md px-4 py-2 flex items-center justify-center exploration-button">
                  충전
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 오른쪽 QR & 칩 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button
            variant="outline"
            size="compact"
            className="text-gray-800 caption-8-medium h-7 px-1 py-1 whitespace-nowrap"
            onClick={() => router.push('/mypage/edit-profile')}
          >
            ✏️&nbsp;프로필 수정
          </Button>
          <Image
            src={IMAGE_PATHS.QR}
            alt="QR 코드"
            width={64}
            height={64}
            className="sm:w-[80px] sm:h-[80px]"
          />
          <Image
            src={IMAGE_PATHS.IC}
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
