'use client';

import { useRouter } from 'next/navigation';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

import type { ProfileUser } from '@/api/types/profile';
import { ICON_PATHS } from '@/constants/icons';
import { Icon } from '@/shared';
import { getMobileDataTypeDisplay } from '@/utils/mobileData';

interface ProfileContentSectionsProps {
  profile: ProfileUser;
}

export function ProfileContentSections({ profile }: ProfileContentSectionsProps) {
  const router = useRouter();
  const tradePosts = profile.tradePostsRes || [];
  const tradePostsCount = tradePosts.length;

  const handleDataListClick = () => {
    router.push(`/profile/${profile.userId}/datalist`);
  };

  return (
    <div className="space-y-6">
      {/* TODO: 거래 현황 */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg">거래 현황</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">7일 평균 거래량</span>
            <span className="text-white text-sm font-medium">2건</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">7일 평균 거래 시간</span>
            <div className="flex items-center gap-1">
              <span className="text-white text-sm font-medium">낮</span>
              <span className="text-lg">☀️</span>
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-px bg-white opacity-20"></div>

      {/* TODO: 보유 업적 */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg">보유 업적</h3>
        <div className="text-center text-gray-400 py-4">보유한 업적이 없습니다.</div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-px bg-white opacity-20"></div>

      {/* 판매중인 데이터 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-lg">
            판매중인 데이터 <span className="text-cyan-400"> {tradePostsCount}</span>건
          </h3>
          {tradePostsCount > 0 && (
            <span
              onClick={handleDataListClick}
              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors cursor-pointer"
            >
              자세히 보기
            </span>
          )}
        </div>

        {tradePostsCount > 0 ? (
          <div className="w-full">
            <Swiper
              modules={[FreeMode]}
              spaceBetween={12}
              slidesPerView="auto"
              freeMode={true}
              className="!px-1"
            >
              {tradePosts.map((post) => (
                <SwiperSlide key={post.postId} className="!w-auto">
                  <div className="bg-gray-800 rounded-lg p-4 w-24 h-24 flex flex-col items-center justify-center space-y-2">
                    {/* 통신사 로고 - null 체크 추가 */}
                    {post.carrier && ICON_PATHS[post.carrier] && (
                      <Icon src={ICON_PATHS[post.carrier]} className="w-6 h-6" />
                    )}

                    {/* 용량 */}
                    <div className="text-cyan-400 text-xs font-bold text-center">
                      {post.sellMobileDataAmountGB || 0}GB
                    </div>

                    {/* ZET 표시 */}
                    <div className="text-gray-400 text-xs">
                      {post.mobileDataType ? getMobileDataTypeDisplay(post.mobileDataType) : 'N/A'}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-4">판매중인 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
