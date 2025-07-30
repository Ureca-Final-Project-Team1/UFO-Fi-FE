'use client';

import { PACKAGES } from '@/constants';
import { ZetChargePackageCard } from '@/features/charge/components/ZetChargePackageCard';
import { useZetCharge } from '@/features/charge/hooks/useZetCharge';
import { Title } from '@/shared';

export default function ZetChargePage() {
  const { handleChargePackage, isProcessing } = useZetCharge();

  return (
    <div className="min-h-full flex flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <Title title="ZET 코인 충전소" iconVariant="back" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
        </div>

        {/* 패키지 카드 */}
        <div className="flex flex-col gap-3 mb-6">
          {PACKAGES.map((pkg) => (
            <ZetChargePackageCard
              key={pkg.id}
              id={pkg.id}
              zet={pkg.zet}
              price={pkg.price}
              onBuyClick={handleChargePackage}
            />
          ))}
        </div>

        {/* 결제 로딩 */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 max-w-sm mx-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              <p className="text-gray-700 font-medium">결제를 준비하고 있습니다...</p>
              <p className="text-gray-500 text-sm text-center">
                잠시 후 결제창이 나타납니다.
                <br />
                창을 닫지 마세요!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
