'use client';

import { useRouter, useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { exchangeAPI } from '@/api';
import { AuthModal } from '@/features/exchange/components/AuthModal';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';

interface PostData {
  title: string;
  zetPerUnit: number;
  capacity: number;
  carrier: string;
}

interface EditContextType {
  postData: PostData | null;
  isLoading: boolean;
  isAuthorized: boolean | null;
}

const EditContext = createContext<EditContextType>({
  postData: null,
  isLoading: true,
  isAuthorized: null,
});

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEditContext must be used within EditProvider');
  }
  return context;
};

interface EditProviderProps {
  children: React.ReactNode;
}

export const EditProvider = ({ children }: EditProviderProps) => {
  const router = useRouter();
  const params = useParams();
  const { data: userInfo, isLoading: isUserLoading } = useMyInfo();

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '접근 권한 없음',
    description: '본인이 작성한 글만 수정할 수 있습니다.\n거래소로 돌아가겠습니다.',
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOwnership = async () => {
      if (isUserLoading || !userInfo || !params.id) return;

      try {
        setIsLoading(true);

        // 게시글 정보를 API에서 가져와서 소유권 확인
        const response = await exchangeAPI.getPosts();
        const posts = response.posts || [];
        const targetPost = posts.find((post) => post.postId === Number(params.id));

        if (!targetPost) {
          setAuthModal((prev) => ({
            ...prev,
            title: '게시글을 찾을 수 없습니다',
            description: '삭제되었거나 존재하지 않는 게시글입니다.\n거래소로 돌아가겠습니다.',
            isOpen: true,
          }));
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // 게시글 작성자와 현재 사용자 비교
        const isOwner = userInfo.nickname === targetPost.sellerNickname;

        if (!isOwner) {
          setAuthModal((prev) => ({ ...prev, isOpen: true }));
          setIsAuthorized(false);
        } else {
          // 권한이 있으면 게시글 데이터를 상태에 저장
          setPostData({
            title: targetPost.title,
            zetPerUnit: targetPost.pricePerUnit,
            capacity: targetPost.sellMobileDataCapacityGb,
            carrier: targetPost.carrier,
          });
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('게시글 소유권 확인 실패:', error);
        setAuthModal((prev) => ({
          ...prev,
          title: '오류가 발생했습니다',
          description: '게시글 정보를 확인할 수 없습니다.\n거래소로 돌아가겠습니다.',
          isOpen: true,
        }));
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOwnership();
  }, [userInfo, isUserLoading, params.id]);

  const handleModalClose = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
    router.push('/exchange');
  };

  // 로딩 중
  if (isUserLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">권한을 확인하는 중...</div>
      </div>
    );
  }

  // 권한이 없는 경우
  if (isAuthorized === false) {
    return (
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={handleModalClose}
        title={authModal.title}
        description={authModal.description}
      />
    );
  }

  // 권한이 있는 경우 Context Provider로 감싸서 렌더링
  return (
    <EditContext.Provider value={{ postData, isLoading: false, isAuthorized }}>
      {children}
    </EditContext.Provider>
  );
};
