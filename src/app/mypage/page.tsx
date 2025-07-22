'use client';

import { useRouter } from 'next/navigation';

import MenuSection from '@/features/mypage/components/MenuSection';
import SignalCard from '@/features/mypage/components/SignalCard';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Icon } from '@/shared/ui/Icons';
import { useTradeTabStore } from '@/stores/useTradeTabStore';

export default function MyPage() {
  const router = useRouter();
  const { data: mypageInfo, error, isLoading } = useMyInfo();
  const { setTab } = useTradeTabStore();

  const navigateToSalesHistory = () => {
    setTab('sell');
    router.push('/mypage/trade');
  };
  const navigateToPurchaseHistory = () => {
    setTab('purchase');
    router.push('/mypage/trade');
  };
  const navigateToLogout = () => router.push('/logout');
  const navigateToTerms = () => router.push('/terms');
  const navigateToFollow = () => router.push('/mypage/follow');
  const navigateToNotification = () => router.push('/mypage/notification');

  const transactionItems = [
    { label: '판매 내역', onClick: navigateToSalesHistory },
    { label: '구매 내역', onClick: navigateToPurchaseHistory },
  ];

  const supportItems = [
    { label: '로그아웃', onClick: navigateToLogout },
    { label: '이용 약관', onClick: navigateToTerms },
  ];

  if (isLoading) {
    return <div className="text-center text-white py-10">로딩 중...</div>;
  }

  return (
    <div className="w-full text-white py-6 ">
      {/* Signal Card */}
      <SignalCard
        userId={mypageInfo?.nickname ?? ''}
        profileImageUrl={mypageInfo?.profileImageUrl}
        zetAmount={mypageInfo?.zetAsset ?? 0}
        availableData={mypageInfo?.sellableDataAmount ?? 0}
        maxData={mypageInfo?.sellMobileDataCapacityGb ?? 0}
      />

      {error && <div className="text-red-500 text-sm text-center my-4">{error.message}</div>}
      <hr className="my-6 border-white/20" />

      {/* 메뉴 */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
        <div className="hover:cursor-pointer" onClick={navigateToFollow}>
          <Icon name="Heart" size={24} className="mx-auto text-white" />
          <p className="mt-2 caption-12-regular">팔로우 목록</p>
        </div>
        <div>
          <Icon name="Eye" size={24} className="mx-auto text-white" />
          <p className="mt-2 caption-12-regular">최근 본 글</p>
        </div>
        <div className="hover:cursor-pointer" onClick={navigateToNotification}>
          <Icon name="Bell" size={24} className="mx-auto text-white" />
          <p className="mt-2 caption-12-regular">알림 설정</p>
        </div>
      </div>

      <hr className="my-6 border-white/20" />

      {/* 거래 내역 + 고객 지원 */}
      <div className="space-y-6 text-gray-300">
        <MenuSection title="나의 거래" items={transactionItems} />
        <hr className="border-white/20" />
        <MenuSection title="고객 지원" items={supportItems} />
      </div>
    </div>
  );
}
