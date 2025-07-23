'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { IMAGE_PATHS } from '@/constants/images';
import MenuSection from '@/features/mypage/components/MenuSection';
import SignalCard from '@/features/mypage/components/SignalCard';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Modal, Icon } from '@/shared';
import { useTradeTabStore } from '@/stores/useTradeTabStore';

export default function MyPage() {
  const router = useRouter();
  const { setTab } = useTradeTabStore();
  const [isOpen, setIsOpen] = useState(false);
  const { data: mypageInfo, error, isLoading } = useMyInfo();

  const navigateToSalesHistory = () => {
    setTab('sell');
    router.push('/mypage/trade');
  };
  const navigateToPurchaseHistory = () => {
    setTab('purchase');
    router.push('/mypage/trade');
  };
  const handleLogout = () => {
    // TODO: 로그아웃 로직 추가 필요
    router.push('/login');
    toast.success('로그아웃 되었습니다!');
  };
  const navigateToTerms = () => router.push('/mypage/privacy');
  const navigateToFollow = () => router.push('/mypage/follow');
  const navigateToNotification = () => router.push('/mypage/notification');

  const transactionItems = [
    { label: '판매 내역', onClick: navigateToSalesHistory },
    { label: '구매 내역', onClick: navigateToPurchaseHistory },
  ];

  const supportItems = [
    { label: '로그아웃', onClick: () => setIsOpen(true) },
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
        <div className="group hover:cursor-pointer" onClick={navigateToFollow}>
          <Icon
            name="Heart"
            size={24}
            className="mx-auto transition-all duration-300 group-hover:scale-110 text-white"
          />
          <p className="mt-2 caption-12-regular">팔로우 목록</p>
        </div>
        <div className="group hover:cursor-pointer">
          <Icon
            name="Eye"
            size={24}
            className="mx-auto transition-all duration-300 group-hover:scale-110 text-white"
          />
          <p className="mt-2 caption-12-regular">최근 본 글</p>
        </div>
        <div className="group hover:cursor-pointer" onClick={navigateToNotification}>
          <Icon
            name="Bell"
            size={24}
            className="mx-autotransition-all duration-300 group-hover:scale-110 text-white"
          />
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

      <Modal
        headerAlign="left"
        title="로그아웃"
        description="정말 로그아웃하시겠습니까?"
        onPrimaryClick={handleLogout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageSrc={IMAGE_PATHS['AL_REPORTED']}
        imageAlt="신고"
        imagePosition={{ x: 90, y: 50 }}
        imageSize={{ width: 150, height: 150 }}
        type="double"
        hasCloseButton={false}
      />
    </div>
  );
}
