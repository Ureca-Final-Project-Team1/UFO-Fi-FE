import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

// Mock OnboardingImageFrame for Storybook
const MockOnboardingImageFrame = ({
  onboardingSrc = IMAGE_PATHS.AL_ONBOARDING,
}: {
  onboardingSrc?: string;
}) => {
  // 마스크 스타일 상수화
  const MASK_STYLE: React.CSSProperties = {
    WebkitMaskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    WebkitMaskPosition: 'center',
    maskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
    maskRepeat: 'no-repeat',
    maskSize: '100% 100%',
    maskPosition: 'center',
    maskType: 'alpha',
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">온보딩 이미지 프레임</h2>

          <div className="relative w-full h-auto max-w-sm mx-auto">
            {/* 창문 테두리 이미지 */}
            <Image
              src={IMAGE_PATHS.WINDOW_BORDER}
              alt="창문 테두리"
              width={300}
              height={300}
              className="w-full h-auto z-0"
              priority
            />

            {/* 마스킹된 콘텐츠 영역 */}
            <div className="absolute inset-0 z-10 scale-[0.83]" style={MASK_STYLE}>
              {/* 우주 배경 */}
              <Image src={IMAGE_PATHS.WINDOW} alt="우주 배경" fill className="object-cover" />

              {/* 온보딩 콘텐츠 이미지 */}
              <Image
                src={onboardingSrc}
                alt="온보딩 이미지"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockOnboardingImageFrame> = {
  title: 'Onboarding/OnboardingImageFrame',
  component: MockOnboardingImageFrame,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onboardingSrc: {
      control: { type: 'text' },
      description: '온보딩 이미지 소스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockOnboardingImageFrame>;

export const Default: Story = {
  args: {
    onboardingSrc: IMAGE_PATHS.AL_ONBOARDING,
  },
};

export const WithCustomImage: Story = {
  args: {
    onboardingSrc: IMAGE_PATHS.AVATAR,
  },
};

export const Desktop: Story = {
  args: {
    onboardingSrc: IMAGE_PATHS.AL_ONBOARDING,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
