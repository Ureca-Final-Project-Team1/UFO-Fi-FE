import { OnboardingStep } from '@/features/onboarding/types/onboarding';
import { analytics } from '@/shared/utils/analytics';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: '데이터 판매 등록',
    alienMessage: '남는 데이터, 그냥 날려버릴 거예요?\n지구 자원 순환은 우리가 책임져요!',
    description: '요금제 잔여 데이터를 쉽게 판매하세요',
    bulletPoints: ['요금제 잔여 데이터를 1GB 단위로 손쉽게 판매', '판매 용량, 가격, 통신사 설정'],
    buttonText: '다음',
    image: '/images/onboarding/step1.jpg',
    isLastStep: false,
  },
  {
    id: 2,
    title: '전파 거래소',
    alienMessage: '여긴 지구 데이터 거래의 중심지!\n다른 지구인들이 올린 상품을 둘러보세요.',
    description: '실시간 데이터 거래 마켓플레이스',
    bulletPoints: [
      '실시간으로 등록된 데이터 상품 확인',
      '가격순 / 용량순 필터로 원하는 상품 빠르게 찾기',
    ],
    buttonText: '다음',
    image: '/images/onboarding/step2.jpg',
    isLastStep: false,
  },
  {
    id: 3,
    title: '마이페이지',
    alienMessage: '지구에서 뭘 했는지 궁금하신가요?\n여기 다~ 정리해뒀어요!',
    description: '내 거래 활동을 한눈에 관리',
    bulletPoints: ['내 거래 내역과 충전 이력 통합 조회', '계좌 정보 및 내 프로필 직접 관리'],
    buttonText: '다음',
    image: '/images/onboarding/step3.jpg',
    isLastStep: false,
  },
  {
    id: 4,
    title: '안전한 거래 시스템',
    alienMessage: '우주에서도 신뢰가 최우선!\n거래 내역부터 신고 관리까지 모두 투명해요.',
    description: '신뢰할 수 있는 거래 환경',
    bulletPoints: ['판매자/구매자 신뢰도 정보 확인 가능', '신고 이력 및 제재 상태를 통한 알림'],
    buttonText: '다음',
    image: '/images/onboarding/step4.jpg',
    isLastStep: false,
  },
  {
    id: 5,
    title: 'ZET 충전',
    alienMessage: 'ZET은 이 행성의 데이터 화폐!\n충전하고 바로 거래를 시작해보세요.',
    description: '데이터 거래 전용 토큰',
    bulletPoints: ['데이터 구매에 사용하는 전용 토큰 ZET', '충전 패키지에 따라 추가 보너스 지급'],
    buttonText: '시작하기',
    image: '/images/onboarding/step5.jpg',
    isLastStep: true,
  },
];

export const onboardingUtils = {
  /**
   * 온보딩 완료 처리
   * - MS Clarity와 GA4에 이벤트 전송
   */
  markComplete: (userId?: string): void => {
    try {
      // 온보딩 완료 이벤트 전송 (GTM + Clarity)
      analytics.event('onboarding_completed', {
        timestamp: Date.now(),
        completion_date: new Date().toISOString(),
        steps_completed: ONBOARDING_STEPS.length,
        user_id: userId || 'anonymous',
      });

      // 사용자 식별 및 속성 업데이트 (Clarity)
      if (userId) {
        analytics.identifyUser(userId, {
          onboarding_completed: true,
          onboarding_completion_date: new Date().toISOString(),
          user_journey_stage: 'activated',
        });
      }

      // 기능 사용 트래킹
      analytics.track.featureUsed('onboarding_flow', 'completion');
    } catch (error) {
      console.error('온보딩 완료 이벤트 전송 실패:', error);
    }
  },

  /**
   * 온보딩 시작 트래킹
   */
  trackStart: (userId?: string): void => {
    analytics.event('onboarding_started', {
      timestamp: Date.now(),
      user_id: userId || 'anonymous',
    });
  },

  /**
   * 온보딩 단계 진행 트래킹
   */
  trackStep: (stepNumber: number, stepTitle: string, userId?: string): void => {
    analytics.event('onboarding_step_viewed', {
      step_number: stepNumber,
      step_title: stepTitle,
      progress_percentage: Math.round((stepNumber / ONBOARDING_STEPS.length) * 100),
      user_id: userId || 'anonymous',
    });
  },
};
