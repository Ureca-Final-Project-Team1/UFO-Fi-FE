'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { logoutAPI } from '@/api';
import { Button, Modal } from '@/shared';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ userName = 'Admin' }: HeaderProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutAPI.setLogout();
      toast.success('로그아웃되었습니다.');
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('로그아웃에 실패했습니다.');
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 왼쪽: 로고 및 타이틀 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">UFO-Fi Admin</h1>
            </div>

            {/* 오른쪽: 사용자 정보 및 로그아웃 */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{userName}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLogoutModalOpen(true)}
                className="text-gray-700 hover:text-gray-900"
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="로그아웃 확인"
        description="정말 로그아웃하시겠습니까?"
        type="double"
        primaryButtonText={isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        secondaryButtonText="취소"
        onPrimaryClick={handleLogout}
        onSecondaryClick={() => setIsLogoutModalOpen(false)}
        primaryButtonDisabled={isLoggingOut}
      />
    </>
  );
}
