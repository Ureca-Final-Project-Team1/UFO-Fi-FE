import { useState } from 'react';
import { toast } from 'sonner';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export function useWebShare() {
  const [isSharing, setIsSharing] = useState(false);

  const canShare = typeof navigator !== 'undefined' && navigator.share;

  const isClipboardAvailable = () => {
    return (
      typeof navigator !== 'undefined' &&
      'clipboard' in navigator &&
      'writeText' in navigator.clipboard
    );
  };

  const share = async (data: ShareData) => {
    if (!canShare) {
      if (!isClipboardAvailable()) {
        throw new Error('Clipboard not supported');
      }
      try {
        await navigator.clipboard.writeText(data.url);
        toast.success('링크가 복사되었습니다!');
      } catch {
        toast.error('링크 복사에 실패했습니다.');
      }
      return;
    }

    try {
      setIsSharing(true);
      await navigator.share(data);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('공유에 실패했습니다.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('링크가 복사되었습니다!');
    } catch {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return {
    share,
    copyToClipboard,
    canShare,
    isSharing,
  };
}
