'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared/ui/Button';
import { Title } from '@/shared/ui/Title';
import '@/styles/globals.css';

const packages = [
  { id: 'A', zet: 180, price: 1800 },
  { id: 'B', zet: 360, price: 3600 },
  { id: 'C', zet: 360, price: 3600 },
  { id: 'D', zet: 1200, price: 12000 },
  { id: 'E', zet: 3000, price: 30000 },
];

export default function ZetChargePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-full flex flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <Title title="ZET 코인 충전소" iconVariant="back" onClick={() => router.back()} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
          <div
            className="flex items-center justify-center ml-2"
            style={{
              width: '124px',
              height: '36.46px',
              background: 'var(--color-primary-700)',
              border: '2px solid var(--color-border-zet)',
              borderRadius: '12px',
            }}
          >
            <Image
              src={IMAGE_PATHS.PACKAGE_A}
              alt="패키지 아이콘"
              width={20}
              height={20}
              className="mr-2"
            />
            <span
              style={{
                color: 'var(--color-badge-text-cyan)',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                fontFamily: 'Pretendard, sans-serif',
              }}
            >
              200
            </span>
            <span
              style={{
                color: 'var(--color-badge-text-cyan)',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                fontFamily: 'Pretendard, sans-serif',
                marginLeft: '6px',
              }}
            >
              ZET
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="gradient-card-1 w-[358px] h-[104px] rounded-2xl px-5 py-3 relative"
            >
              <Image
                src={IMAGE_PATHS[`PACKAGE_${pkg.id}` as keyof typeof IMAGE_PATHS]}
                alt={`패키지 ${pkg.id} 이미지`}
                width={pkg.id === 'A' ? 37 : 56}
                height={pkg.id === 'A' ? 37 : 60}
                className={`absolute ${pkg.id === 'A' ? 'left-7' : 'left-5'} top-1/2 -translate-y-1/2`}
              />
              <div className="flex flex-col justify-center h-full ml-[64px]">
                <div className="flex items-center gap-[2px] mb-[2px]">
                  <Image src={IMAGE_PATHS.PACKAGE_A} alt="패키지 아이콘" width={20} height={20} />
                  <span className="body-16-bold text-white">패키지 {pkg.id}</span>
                </div>
                <div className="heading-24-bold text-badge-cyan mb-[2px]">{pkg.zet} ZET</div>
                <div className="body-16-semibold text-white">₩{pkg.price.toLocaleString()}</div>
              </div>
              <div className="absolute bottom-3 right-5">
                <Button variant="exploration-button" size="sm">
                  구매하기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
