'use client';

import { useRouter } from 'next/navigation';

import { Button, Icon } from '@/shared';

export const ExchangeEmpty = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-gray-400 text-center">
        <Icon name="Package" size="xl" className="mx-auto mb-4 opacity-50" />
        <p className="text-lg mb-2">등록된 판매글이 없습니다</p>
        <p className="text-sm mb-6">첫 번째 거래글을 등록해보세요!</p>
        <Button variant="exploration-button" onClick={() => router.push('/sell')} className="px-6">
          판매글 등록하기
        </Button>
      </div>
    </div>
  );
};
