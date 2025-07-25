'use client';

import { toast } from 'sonner';

import { TOAST_CONFIG } from '@/constants';
import { Button } from '@/shared/ui';

export default function TestToastPage() {
  const showSuccessToast = () => {
    console.log('토스트 호출됨: success');
    toast.success('성공 토스트입니다!');
  };

  const showErrorToast = () => {
    toast.error('오류 토스트입니다!');
  };

  const showInfoToast = () => {
    toast.info('정보 토스트입니다!');
  };

  const showWarningToast = () => {
    toast.warning('경고 토스트입니다!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-2xl font-bold text-white mb-8">토스트 테스트 페이지</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button onClick={showSuccessToast} variant="primary">
          성공 토스트 표시
        </Button>

        <Button onClick={showErrorToast} variant="secondary">
          오류 토스트 표시
        </Button>

        <Button onClick={showInfoToast} variant="outline">
          정보 토스트 표시
        </Button>

        <Button onClick={showWarningToast} variant="ghost">
          경고 토스트 표시
        </Button>
      </div>

      <div className="mt-8 text-center text-gray-300">
        <p>각 버튼을 클릭하여 토스트가 정상적으로 표시되는지 확인해보세요.</p>
        <p className="text-sm mt-2">토스트는 화면 하단 중앙에 표시됩니다. (하단 네비게이션 위)</p>
        <p className="text-xs mt-1 text-gray-400">
          현재 설정: {TOAST_CONFIG.POSITION}, 하단 여백: {TOAST_CONFIG.BOTTOM_OFFSET}
        </p>
      </div>
    </div>
  );
}
