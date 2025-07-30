import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared';
import { useModalStore } from '@/stores/useModalStore';

import { GlobalModal } from './GlobalModal';

const meta: Meta<typeof GlobalModal> = {
  title: 'UI/Modal/Playground',
  component: GlobalModal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <Story />
        <GlobalModal />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GlobalModal>;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow p-6 mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-3 gap-4">{children}</div>
  </div>
);

const PlaygroundDemo = () => {
  const { showAlert, showConfirm, showImageModal } = useModalStore();

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">Playground</h1>

      <Section title="크기별 사이즈">
        <Button onClick={() => showAlert('Small', '280px 너비', undefined, { size: 'sm' })}>
          Small
        </Button>
        <Button onClick={() => showAlert('Medium', '320px 너비', undefined, { size: 'md' })}>
          Medium
        </Button>
        <Button onClick={() => showAlert('Large', '380px 너비', undefined, { size: 'lg' })}>
          Large
        </Button>
      </Section>

      <Section title="버튼 타입">
        <Button
          onClick={() => showAlert('Single', '확인만 있는 모달', undefined, { type: 'single' })}
        >
          Single
        </Button>
        <Button
          onClick={() =>
            showConfirm(
              'Double',
              '확인/취소 버튼 있음',
              () => alert('확인'),
              () => alert('취소'),
            )
          }
        >
          Double
        </Button>
        <Button
          onClick={() =>
            showAlert('No Button', '버튼 없음. X로만 닫음', undefined, {
              type: 'none',
              hasCloseButton: true,
            })
          }
        >
          None
        </Button>
      </Section>

      <Section title="이미지 위치 테스트">
        <Button
          onClick={() =>
            showImageModal('왼쪽 이미지', '왼쪽에 이미지', IMAGE_PATHS.AL_HAPPY, {
              imagePosition: { x: 13, y: 30 },
            })
          }
        >
          왼쪽 위
        </Button>
        <Button
          onClick={() =>
            showImageModal('오른쪽 이미지', '오른쪽에 이미지', IMAGE_PATHS.AL_HAPPY, {
              imagePosition: { x: 80, y: 20 },
            })
          }
        >
          오른쪽 아래
        </Button>
        <Button
          onClick={() =>
            showImageModal('중앙 이미지', '가운데', IMAGE_PATHS.AL_SAD, {
              imagePosition: { x: 50, y: 50 },
              imageSize: { width: 100, height: 100 },
            })
          }
        >
          정중앙
        </Button>
      </Section>
    </div>
  );
};

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};
