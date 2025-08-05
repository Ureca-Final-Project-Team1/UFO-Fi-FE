import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/shared';

import { MarkdownRenderer } from './MarkdownRenderer';

const MarkdownRendererComponent = ({ text }: { text: string }) => {
  return <div className="text-white">{MarkdownRenderer(text)}</div>;
};

const meta: Meta<typeof MarkdownRendererComponent> = {
  title: 'Common/MarkdownRenderer',
  component: MarkdownRendererComponent,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownRendererComponent>;

const renderWithLayout = (
  args: { text: string },
  title: string = '마크다운 렌더러 테스트',
  isDesktop = false,
) => (
  <div className="h-full flex flex-col bg-gray-900">
    <div className={`px-4 pt-4 ${isDesktop ? 'max-w-2xl mx-auto w-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-bold">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-1 leading-relaxed hide-scrollbar">
        <MarkdownRendererComponent {...args} />
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    text: '이것은 기본 마크다운 텍스트입니다.',
  },
  render: (args) => renderWithLayout(args),
};

export const Headings: Story = {
  args: {
    text: `# 제목 1
## 제목 2
### 제목 3

일반 텍스트입니다.`,
  },
  render: (args) => renderWithLayout(args),
};

export const Lists: Story = {
  args: {
    text: `# 리스트 예제

## 순서가 있는 리스트
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

## 순서가 없는 리스트
- 항목 1
- 항목 2
- 항목 3`,
  },
  render: (args) => renderWithLayout(args),
};

export const Links: Story = {
  args: {
    text: `# 링크 예제

이메일: test@example.com
웹사이트: www.example.com
깃허브: https://github.com/example

이것은 일반 텍스트입니다.`,
  },
  render: (args) => renderWithLayout(args),
};

export const PrivacyPolicy: Story = {
  args: {
    text: `# 개인정보 처리방침

## 1. 개인정보의 처리 목적

회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.

- 회원 가입 및 관리
- 서비스 제공 및 운영
- 고객 상담 및 문의 응대

## 2. 개인정보의 처리 및 보유 기간

회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

## 3. 개인정보의 제3자 제공

회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

## 4. 정보주체의 권리·의무 및 그 행사방법

이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.

1. 개인정보 열람요구
2. 오류 등이 있을 경우 정정 요구
3. 삭제요구
4. 처리정지 요구

## 5. 개인정보의 안전성 확보 조치

회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.

- 개인정보의 암호화
- 해킹 등에 대비한 기술적 대책
- 개인정보에 대한 접근 제한

## 6. 개인정보 보호책임자

회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

- 개인정보 보호책임자
  - 성명: 홍길동
  - 직책: 개인정보보호책임자
  - 연락처: privacy@example.com

## 7. 개인정보 처리방침의 변경

이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.`,
  },
  render: (args) => renderWithLayout(args, '개인정보 처리방침'),
};

export const Desktop: Story = {
  args: {
    text: `# 데스크톱 마크다운 테스트

## 제목 예제
이것은 데스크톱에서의 마크다운 렌더러 테스트입니다.

### 리스트 예제
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

### 링크 예제
- 이메일: test@example.com
- 웹사이트: www.example.com

이것은 일반 텍스트입니다.`,
  },
  render: (args) => renderWithLayout(args, '데스크톱 마크다운 테스트', true),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
