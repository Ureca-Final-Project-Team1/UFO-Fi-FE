import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from '../Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radix 기반의 Dialog 모달 컴포넌트입니다. 타이틀, 설명, 컨텐츠 및 닫기 버튼을 포함합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a sample dialog description.</DialogDescription>
        </DialogHeader>
        <div className="py-4">여기에 주요 내용을 입력하세요.</div>
        <DialogFooter>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 Dialog 사용 예시입니다.',
      },
    },
  },
};

export const WithLongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">긴 내용 보기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>스크롤이 필요한 긴 내용</DialogTitle>
          <DialogDescription>스크롤이 가능한 콘텐츠입니다.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>여기에 긴 내용이 반복됩니다. Line {i + 1}</p>
          ))}
        </div>
        <DialogFooter>
          <Button>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: '스크롤 가능한 긴 내용을 가진 Dialog 예시입니다.',
      },
    },
  },
};
