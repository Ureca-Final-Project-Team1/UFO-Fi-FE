'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants';
import { Button } from '@/shared';

interface SpaceMailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
}

export function SpaceMailModal({ isOpen, onOpenChange, name }: SpaceMailModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onOpenChange(false);
    router.push('/signal');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 max-w-[320px] -translate-x-1/2 -translate-y-1/2
                     rounded-2xl p-6 text-center text-white flex flex-col items-center"
        >
          {/* 텍스트 */}
          <Dialog.Title asChild>
            <h2 className="text-base leading-relaxed whitespace-pre-line font-semibold mb-6 body-20-regular">
              {name} 님에게{'\n'}
              <span className="text-sky-400 font-bold">우주 탐사 우편</span>이 도착했어요
            </h2>
          </Dialog.Title>

          {/* 이미지 */}
          <Image
            src={IMAGE_PATHS.AL_SPACE}
            alt="우주 편지"
            width={180}
            height={180}
            className="mb-4"
            unoptimized
          />

          {/* 버튼 */}
          <div className="w-full flex gap-3 body-20-bold">
            <Button variant="primary" className="flex-1 text-white" onClick={handleConfirm}>
              편지 확인
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
