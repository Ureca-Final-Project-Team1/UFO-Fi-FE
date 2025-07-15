'use client';
import { useRouter } from 'next/navigation';

import MenuSection from '@/features/mypage/components/MenuSection';
import SignalCard from '@/features/mypage/components/SignalCard';
import { Icon } from '@/shared/ui/Icons';

export default function MyPage() {
  const router = useRouter();

  const navigateToSalesHistory = () => {
    router.push('/mypage/sales');
  };

  const navigateToPurchaseHistory = () => {
    router.push('/mypage/receipt');
  };

  const navigateToLogout = () => {
    // 로그아웃 로직 추후 따로 구현
    router.push('/logout');
  };

  const navigateToTerms = () => {
    router.push('/terms');
  };

  const transactionItems = [
    { label: '판매 내역', onClick: navigateToSalesHistory },
    { label: '구매 내역', onClick: navigateToPurchaseHistory },
  ];

  const supportItems = [
    { label: '로그아웃', onClick: navigateToLogout },
    { label: '이용 약관', onClick: navigateToTerms },
  ];

  return (
    <div className="min-h-screen text-white px-4 py-6 space-y-8">
      {/* Signal Card */}
      <SignalCard
        userId="#308"
        profileImageUrl="/assets/user-308.png"
        zetAmount={250}
        availableData={3}
        maxData={5}
      />

      <hr className="bg-white" />

      {/* 메뉴 */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-white">
        <div>
          <div className="text-xl">
            <Icon name="Heart" size={24} className="mx-auto text-white" />
          </div>
          <p className="mt-[0.5rem] caption-12-regular">팔로우 목록</p>
        </div>
        <div>
          <div className="text-xl">
            <Icon name="Eye" size={24} className="mx-auto text-white" />
          </div>
          <p className="mt-[0.5rem] caption-12-regular">최근 본 글</p>
        </div>
        <div>
          <div className="text-xl">
            <Icon name="Bell" size={24} className="mx-auto text-white" />
          </div>
          <p className="mt-[0.5rem] caption-12-regular">알림 설정</p>
        </div>
      </div>

      <hr className="bg-white" />

      {/* 거래 내역 + 고객 지원 */}
      <div className="space-y-4 text-gray-300">
        <MenuSection title="나의 거래" items={transactionItems} />
        <hr className="bg-white" />
        <MenuSection title="고객 지원" items={supportItems} />
      </div>
    </div>
  );
}
