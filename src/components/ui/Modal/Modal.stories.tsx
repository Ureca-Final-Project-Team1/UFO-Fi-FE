import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal/Definition',
  component: Modal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    title: '기본 모달',
    description: 'UFO-Fi 공통 모달입니다.',
    hasCloseButton: true,
    size: 'md',
    type: 'single',
    rounded: 'md',
    headerAlign: 'center',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    imageSrc: undefined,
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 여부',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    description: {
      control: 'text',
      description: '모달 설명',
    },
    hasCloseButton: {
      control: 'boolean',
      description: '우측 상단 X 버튼 표시 여부',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '모달의 너비 크기',
    },
    type: {
      control: 'select',
      options: ['single', 'double', 'none'],
      description: '버튼 구성 방식',
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '모달 테두리 둥글기',
    },
    headerAlign: {
      control: 'select',
      options: ['left', 'center'],
      description: '제목 정렬 방식',
    },
    primaryButtonText: {
      control: 'text',
      description: '기본 버튼 텍스트',
    },
    secondaryButtonText: {
      control: 'text',
      description: '보조 버튼 텍스트 (type: double일 때)',
    },
    imageSrc: {
      control: 'text',
      description: '앱솔루트 이미지 경로 (선택)',
    },
    onClose: {
      action: '닫기',
      description: '닫기 버튼 클릭 핸들러',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'UFO-Fi 공통 Modal 컴포넌트입니다. Controls 탭에서 다양한 속성을 실시간 조작해보세요.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = (args: React.ComponentProps<typeof Modal>) => {
  // Storybook Controls에서 isOpen 값을 받아 내부 상태로 관리
  const [open, setOpen] = useState(args.isOpen);

  useEffect(() => {
    // 외부에서 isOpen prop이 변경될 때 내부 상태도 동기화
    setOpen(args.isOpen);
  }, [args.isOpen]);

  return <Modal {...args} isOpen={open} onClose={() => setOpen(false)} />;
};

export const Basic: Story = {
  render: (args) => <ModalWrapper {...args} />,
};
