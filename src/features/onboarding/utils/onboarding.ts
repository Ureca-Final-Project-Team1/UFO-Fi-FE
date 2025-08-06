import { IMAGE_PATHS } from '@/constants';
import { OnboardingStep } from '@/features/onboarding/types/onboarding';
import { analytics } from '@/shared/utils/analytics';

// 온보딩 단계 정의
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: '전파 거리',
    alienTitle: '다른 사용자와 거래를 완료하면, 그 사람과 연결된 전파거리가 생겨요.',
    alienMessage: '그 전파거리를 따라, 어쩌면 누군가의 진심이 담긴 편지가 도착할지도요?',
    description: '데이터 거래 여정을 궤도로 그려드립니다',
    bulletPoints: ['거래 히스토리로 나만의 행성 궤도 생성', '지구인 친구들과 전파 거리 경쟁!'],
    buttonText: '다음',
    image: IMAGE_PATHS.ONBOARDING_STEP1,
    isLastStep: false,
  },
  {
    id: 2,
    title: '전파 거래소',
    alienTitle: '여긴 지구 데이터 거래의 중심지!',
    alienMessage:
      '다른 지구인들의 상품을 탐사해보세요. 한 번의 클릭으로 모두 가져올 수 있으니까요!',
    description: '실시간 데이터 거래 마켓플레이스',
    bulletPoints: [
      '실시간으로 등록된 데이터 상품 확인',
      '가격순 / 용량순 필터로 원하는 상품 빠르게 찾기',
    ],
    buttonText: '다음',
    image: IMAGE_PATHS.ONBOARDING_STEP2,
    isLastStep: false,
  },
  {
    id: 3,
    title: 'ZET 충전',
    alienTitle: 'ZET는 이 행성의 데이터 화폐!',
    alienMessage: '충전하고 바로 거래를 시작해보세요.',
    description: '데이터 거래 전용 토큰',
    bulletPoints: ['데이터 구매에 사용하는 전용 토큰 ZET', '충전 패키지에 따라 추가 보너스 지급'],
    buttonText: '시작하기',
    image: IMAGE_PATHS.ONBOARDING_STEP3,
    isLastStep: true,
  },
  {
    id: 4,
    title: '판매 등록',
    alienTitle: '남는 데이터, 그냥 날려버릴 거예요?',
    alienMessage:
      '버려지는 데이터도 다른 지구인에게 가치 있게 전달될 수 있어요. 지구 자원 순환은 우리가 책임져요!',
    description: '요금제 잔여 데이터를 쉽게 판매하세요',
    bulletPoints: ['요금제 잔여 데이터를 1GB 단위로 손쉽게 판매', '판매 용량, 가격, 통신사 설정'],
    buttonText: '다음',
    image: IMAGE_PATHS.ONBOARDING_STEP4,
    isLastStep: false,
  },
  {
    id: 5,
    title: '업적 도감',
    alienTitle: '당신의 기록은 우주 사령부에 저장됩니다.',
    alienMessage: '특별한 행동은 업적으로 남고, 당신만의 데이터로 차곡차곡 쌓아나갈 수 있어요!',
    description: '거래 활동을 통해 다양한 업적 달성',
    bulletPoints: ['달성한 업적은 칭호와 함께 저장', '보상과 뱃지로 동기부여 강화'],
    buttonText: '시작하기',
    image: IMAGE_PATHS.ONBOARDING_STEP5,
    isLastStep: true,
  },
];

// 내부 유틸
const getUserId = (userId?: string) => userId ?? 'anonymous';
const getNowISO = () => new Date().toISOString();
const stepCount = ONBOARDING_STEPS.length;

// 온보딩 유틸
export const onboardingUtils = {
  /**
   * 온보딩 완료 처리 (GA4, Clarity)
   */
  markComplete: (userId?: string): void => {
    const uid = getUserId(userId);

    try {
      analytics.event('onboarding_completed', {
        timestamp: Date.now(),
        completion_date: getNowISO(),
        steps_completed: stepCount,
        user_id: uid,
      });

      if (userId) {
        analytics.identifyUser(userId, {
          onboarding_completed: true,
          onboarding_completion_date: getNowISO(),
          user_journey_stage: 'activated',
        });
      }

      analytics.track.featureUsed('onboarding_flow', 'completion');
    } catch (error) {
      console.error('[onboarding] 완료 이벤트 전송 실패:', error);
    }
  },

  /**
   * 온보딩 시작 트래킹
   */
  trackStart: (userId?: string): void => {
    analytics.event('onboarding_started', {
      timestamp: Date.now(),
      user_id: getUserId(userId),
    });
  },

  /**
   * 특정 단계 조회 트래킹
   */
  trackStep: (stepNumber: number, stepTitle: string, userId?: string): void => {
    analytics.event('onboarding_step_viewed', {
      step_number: stepNumber,
      step_title: stepTitle,
      progress_percentage: Math.round((stepNumber / stepCount) * 100),
      user_id: getUserId(userId),
    });
  },
};
