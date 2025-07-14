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

export default function SignalCard({
  userId,
  profileImageUrl,
  zetAmount,
  availableData,
  maxData,
}: SignalCardProps) {
  return (
    <div
      className="mt-[1rem] text-black rounded-xl shadow-lg border-[4px] mx-auto w-[28rem]"
      style={{
        maxWidth: 'var(--width-mobile-max)',
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
      <div className="flex justify-between items-start px-6 pb-3 gap-5">
        {/* 왼쪽 캐릭터 */}
        <div className="flex flex-col items-center shrink-0">
          <Image
            src={profileImageUrl || '/images/avatar.png'}
            alt="지구인"
            width={80}
            height={80}
            className="rounded-md border"
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

          <div className="flex items-center caption-12-bold">
            <span>이번 달 판매 가능 용량 :</span>
          </div>

          {/* Progress 컴포넌트 */}
          <Progress usedStorage={availableData} totalStorage={maxData} size="sm" />
          <hr className="border-black/30" />
          <div className="caption-12-bold flex flex-col">
            <span>보유중인 ZET :</span>
            <div className="flex items-center">
              <span className="body-16-bold font-bold text-chart-4">{zetAmount} ZET</span>
              <button className="ml-auto body-14-medium text-white rounded-md px-4 py-2 flex items-center justify-center exploration-button">
                충전
              </button>
            </div>
          </div>
        </div>

        {/* QR + 칩 */}
        <div className="flex flex-col items-end gap-2">
          <Button
            variant="outline"
            size="compact"
            className="caption-8-medium h-7 px-1 py-1 whitespace-nowrap"
          >
            ✏️ 프로필 수정
          </Button>
          <Image src="/images/QR.png" alt="QR 코드" width={80} height={80} />
          <Image src="/images/IC.png" alt="칩" width={50} height={50} className="mt-2" />
        </div>
      </div>
    </div>
  );
}
