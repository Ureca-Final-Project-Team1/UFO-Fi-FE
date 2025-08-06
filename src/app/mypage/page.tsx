'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { logoutAPI, ApiError } from '@/backend';
import { achievementsAPI } from '@/backend/services/mypage/achievement';
import { LogoutModal } from '@/features/mypage/components';
import { FollowCarousel } from '@/features/mypage/components/FollowCarousel';
import MenuSection from '@/features/mypage/components/MenuSection';
import SignalCard from '@/features/mypage/components/SignalCard';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Honorific } from '@/features/mypage/types/Achievement';
import { Button, Icon, IconType, Loading, TitleWithoutRouter } from '@/shared';
import { useToastStore } from '@/stores/useToastStore';

export default function MyPage() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: mypageInfo, error, isLoading, isError, refetch } = useMyInfo();
  const { setToast } = useToastStore();
  const [honorifics, setHonorifics] = useState<Honorific[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchHonorifics = async () => {
      try {
        const response = await achievementsAPI.getHonorifics();
        if (isMounted) {
          setHonorifics(response);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('칭호 조회 실패:', error);
        if (error instanceof ApiError) {
          toast.error(`칭호 조회에 실패했습니다: ${error.message}`);
        } else {
          toast.error('칭호 조회 중 알 수 없는 오류가 발생했습니다.');
        }
      }
    };
    fetchHonorifics();
    return () => {
      isMounted = false;
    };
  }, []);

  const navigateToSellHistory = useCallback(() => {
    router.push('/mypage/trade?tab=sell');
  }, [router]);
  const navigateToPurchaseHistory = useCallback(() => {
    router.push('/mypage/trade?tab=purchase');
  }, [router]);
  const navigateToTerms = useCallback(() => router.push('/mypage/service'), [router]);
  const navigateToPrivacy = useCallback(() => router.push('/mypage/privacy'), [router]);
  const navigateToFollow = useCallback(() => router.push('/mypage/follow'), [router]);
  const navigateToNotification = useCallback(() => router.push('/mypage/notification'), [router]);
  const navigateToAchievement = useCallback(() => router.push('/mypage/achievement'), [router]);

  const handleLogout = async () => {
    try {
      await logoutAPI.setLogout();
      setToast('로그아웃 되었습니다!', 'success');
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      if (error instanceof ApiError) {
        toast.error(`로그아웃에 실패했습니다: ${error.message}`);
      } else {
        toast.error('로그아웃에 실패했습니다.');
      }
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // 메뉴 아이템들
  const transactionItems = [
    { label: '판매 내역', onClick: navigateToSellHistory },
    { label: '구매 내역', onClick: navigateToPurchaseHistory },
  ];

  const supportItems = [
    { label: '로그아웃', onClick: () => setIsLogoutModalOpen(true) },
    { label: '이용 약관', onClick: navigateToTerms },
    { label: '개인정보처리방침', onClick: navigateToPrivacy },
  ];

  // 로딩 상태
  if (isLoading) {
    return <Loading />;
  }

  // 에러 상태 처리
  if (isError && error) {
    const isAuthError = error instanceof ApiError && [401, 403].includes(error.statusCode);

    if (isAuthError) {
      return null;
    }

    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <Icon name="AlertCircle" size={48} className="mx-auto mb-2" />
            <p className="text-lg font-medium">프로필 정보를 불러올 수 없습니다</p>
            <p className="text-sm text-white mt-2">
              {error instanceof ApiError ? error.message : '네트워크 연결을 확인해주세요'}
            </p>
            {error instanceof ApiError && (
              <p className="text-xs text-gray-500 mt-1">오류 코드: {error.statusCode}</p>
            )}
          </div>
          <Button onClick={handleRetry} className="px-4 py-2 bg-blue-600 text-white" type="button">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!mypageInfo) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="text-center text-white">
          <p className="pb-2 body-16-regular">프로필 정보가 없습니다</p>
          <Button onClick={handleRetry} type="button">
            새로고침
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TitleWithoutRouter title="마이페이지" />
      <div className="pb-6">
        {/* Signal Card */}
        <SignalCard
          userId={mypageInfo.nickname || '사용자'}
          profileImageUrl={mypageInfo.profileImageUrl}
          zetAmount={mypageInfo.zetAsset || 0}
          availableData={mypageInfo.sellableDataAmount || 0}
          maxData={mypageInfo.sellMobileDataCapacityGb || 0}
          honorifics={honorifics}
        />
        <hr className="my-6 border-white/20" />
        {/* 메뉴 아이콘들 */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
          <MenuIconButton icon="Heart" label="팔로우 목록" onClick={navigateToFollow} />
          <MenuIconButton icon="Star" label="업적 목록" onClick={navigateToAchievement} />
          <MenuIconButton icon="Bell" label="알림 설정" onClick={navigateToNotification} />
        </div>
        <hr className="my-6 border-white/20" />
        <div className="flex flex-col justify-start">
          <MenuSection title="팔로우할 사용자 추천" />
          <FollowCarousel />
        </div>
        <hr className="my-6 border-white/20" />
        {/* 거래 내역 + 고객 지원 */}
        <div className="space-y-6 text-gray-300">
          <MenuSection title="나의 거래" items={transactionItems} />
          <hr className="border-white/20" />
          <MenuSection title="고객 지원" items={supportItems} />
        </div>
      </div>

      {/* 로그아웃 모달 */}
      <LogoutModal
        onPrimaryClick={handleLogout}
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}

// 메뉴 아이콘 버튼 컴포넌트
interface MenuIconButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

function MenuIconButton({ icon, label, onClick }: MenuIconButtonProps) {
  return (
    <button
      type="button"
      className="group p-2 rounded-lg transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
      onClick={onClick}
    >
      <Icon
        name={icon as IconType}
        size={24}
        className="mx-auto transition-all duration-300 group-hover:scale-110 text-white"
      />
      <p className="mt-2 caption-12-regular">{label}</p>
    </button>
  );
}
