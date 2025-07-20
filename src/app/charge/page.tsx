'use client';

import { IMAGE_PATHS } from '@/constants/images';
import { PACKAGES } from '@/constants/packages';
import { ZetChargePackageCard } from '@/features/charge/components/ZetChargePackageCard';
import { Icon, Title } from '@/shared';
import '@/styles/globals.css';

export default function ZetChargePage() {
  return (
    <div className="relative min-h-full flex flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <Title title="ZET 코인 충전소" iconVariant="back" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
          <div className="w-[124px] h-[36px] bg-primary-700 border-2 border-blue-500 rounded-xl flex items-center justify-center">
            <Icon
              src={IMAGE_PATHS.PACKAGE_A}
              alt="패키지 아이콘"
              className="mr-2 w-[20px] h-[20px]"
            />
            <span className="body-16-bold text-cyan-400">200</span>
            <span className="body-16-bold text-cyan-400 ml-1">ZET</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {PACKAGES.map((pkg) => (
            <ZetChargePackageCard key={pkg.id} id={pkg.id} zet={pkg.zet} price={pkg.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
