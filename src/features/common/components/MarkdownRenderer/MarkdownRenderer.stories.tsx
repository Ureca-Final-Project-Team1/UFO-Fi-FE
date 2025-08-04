import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownRenderer } from './MarkdownRenderer';

const MarkdownRendererComponent = ({ text }: { text: string }) => {
  return <div className="text-white">{MarkdownRenderer(text)}</div>;
};

const meta: Meta<typeof MarkdownRendererComponent> = {
  title: 'Common/MarkdownRenderer',
  component: MarkdownRendererComponent,
  parameters: {
    layout: 'padded',
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

export const Default: Story = {
  args: {
    text: '이것은 기본 마크다운 텍스트입니다.',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Headings: Story = {
  args: {
    text: `# 제목 1
## 제목 2
### 제목 3

일반 텍스트입니다.`,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
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
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Links: Story = {
  args: {
    text: `# 링크 예제

이메일: test@example.com
웹사이트: www.example.com
https://ufo-fi.com

연락처: contact@ufo-fi.com`,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Mixed: Story = {
  args: {
    text: `# UFO-Fi 서비스 이용약관

## 1. 서비스 개요
UFO-Fi는 외계 전파 코인 거래 플랫폼입니다.

## 2. 주요 기능
- ZET 코인 충전
- 데이터 거래
- 프로필 관리

## 3. 연락처
- 이메일: support@ufo-fi.com
- 웹사이트: https://ufo-fi.com

## 4. 이용 절차
1. 회원가입
2. 본인인증
3. 서비스 이용`,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: {
    text: '',
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const LongText: Story = {
  args: {
    text: `# 긴 텍스트 예제

이것은 매우 긴 마크다운 텍스트입니다. 실제 서비스에서 사용되는 약관이나 정책 문서와 같은 형태로 작성되었습니다.

## 섹션 1
이 섹션에서는 서비스의 기본적인 내용을 설명합니다. 사용자가 이해하기 쉽도록 명확하게 작성되어야 합니다.

### 하위 섹션 1.1
- 첫 번째 항목: 서비스 이용 방법
- 두 번째 항목: 주의사항
- 세 번째 항목: 문의 방법

## 섹션 2
두 번째 섹션에서는 더 구체적인 내용을 다룹니다.

1. 첫 번째 단계: 계정 생성
2. 두 번째 단계: 정보 입력
3. 세 번째 단계: 확인 및 완료

## 연락처 정보
- 이메일: contact@example.com
- 전화: 02-1234-5678
- 주소: 서울시 강남구 테헤란로 123

자세한 내용은 웹사이트(www.example.com)를 참고하시기 바랍니다.`,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <h1 className="text-white text-lg font-bold mb-4">마크다운 렌더러 테스트</h1>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};
