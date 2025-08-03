'use client';

import { useRouter, useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { sellAPI } from '@/api';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Loading } from '@/shared';

interface PostData {
  postId: number;
  title: string;
  zetPerUnit: number;
  capacity: number;
  carrier: string;
}

interface EditContextType {
  postData: PostData | null;
}

const EditContext = createContext<EditContextType>({
  postData: null,
});

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEditContext must be used within EditProvider');
  }
  return context;
};

export const EditProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const { data: userInfo, isLoading: isUserLoading } = useMyInfo();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndCheckPost = async () => {
      if (isUserLoading || !userInfo || !params?.id) return;

      const postId = parseInt(params.id as string, 10);
      if (isNaN(postId)) {
        toast.error('잘못된 게시글 ID입니다.');
        router.push('/exchange');
        return;
      }

      try {
        const response = await sellAPI.getPostDetail(postId);
        const post = response.content;

        // 본인 게시글인지 확인
        if (userInfo.nickname !== post.sellerNickname) {
          toast.error('본인이 작성한 글만 수정할 수 있습니다.');
          router.push('/exchange');
          return;
        }

        // 권한 있음
        setPostData({
          postId: post.postId,
          title: post.title,
          zetPerUnit: post.pricePerUnit,
          capacity: post.sellMobileDataCapacityGb,
          carrier: post.carrier,
        });
      } catch (error) {
        console.error('게시글 조회 실패:', error);

        if (error instanceof Error) {
          if (error.message.includes('404')) {
            toast.error('게시글을 찾을 수 없습니다.');
          } else if (error.message.includes('403')) {
            toast.error('접근 권한이 없습니다.');
          } else {
            toast.error('게시글 정보를 불러올 수 없습니다.');
          }
        }
        router.push('/exchange');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCheckPost();
  }, [userInfo, isUserLoading, params.id, router]);

  if (isUserLoading || isLoading) {
    return <Loading />;
  }

  if (!postData) {
    return null;
  }

  return <EditContext.Provider value={{ postData }}>{children}</EditContext.Provider>;
};
