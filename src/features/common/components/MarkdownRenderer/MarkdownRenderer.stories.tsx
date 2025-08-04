import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownRenderer } from './MarkdownRenderer';

// MarkdownRenderer를 React 컴포넌트로 감싸기
const MarkdownRendererComponent = ({ text }: { text: string }) => {
  return <div className="text-white">{MarkdownRenderer(text)}</div>;
};

const meta: Meta<typeof MarkdownRendererComponent> = {
  title: 'Common/MarkdownRenderer',
  component: MarkdownRendererComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: '마크다운 스타일의 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: `# 제목 1
## 제목 2
### 제목 3

일반 텍스트입니다.

1. 순서가 있는 목록 1
2. 순서가 있는 목록 2
   들여쓰기된 텍스트

- 순서가 없는 목록 1
- 순서가 없는 목록 2

이메일: test@example.com
웹사이트: https://example.com`,
  },
};

export const Headings: Story = {
  args: {
    text: `# 메인 제목
## 부제목
### 소제목

이것은 제목들만 있는 예시입니다.`,
  },
};

export const Lists: Story = {
  args: {
    text: `1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

- 순서 없는 항목 1
- 순서 없는 항목 2
- 순서 없는 항목 3`,
  },
};

export const Links: Story = {
  args: {
    text: `이메일 링크: user@example.com
웹사이트: https://www.example.com
일반 도메인: example.com

연락처: contact@company.co.kr`,
  },
};

export const MixedContent: Story = {
  args: {
    text: `# 서비스 이용약관

## 1. 서비스 개요

본 서비스는 사용자에게 다양한 기능을 제공합니다.

### 주요 기능
1. 기능 1
2. 기능 2
3. 기능 3

## 2. 이용 규칙

- 규칙 1을 준수해주세요
- 규칙 2를 준수해주세요

문의사항: support@service.com
웹사이트: https://service.com`,
  },
};

export const Empty: Story = {
  args: {
    text: '',
  },
};

export const LongText: Story = {
  args: {
    text: `# 긴 텍스트 예시

이것은 매우 긴 텍스트의 예시입니다. 마크다운 렌더러가 긴 텍스트를 어떻게 처리하는지 확인할 수 있습니다.

## 섹션 1

이 섹션에는 많은 내용이 포함되어 있습니다. 텍스트가 길어질 때 줄바꿈과 단어 분리가 어떻게 처리되는지 확인할 수 있습니다.

### 하위 섹션

1. 첫 번째 항목
   이 항목은 들여쓰기가 되어 있습니다.
2. 두 번째 항목
   이것도 들여쓰기가 되어 있습니다.

## 섹션 2

- 순서 없는 목록 항목 1
- 순서 없는 목록 항목 2
- 순서 없는 목록 항목 3

이 섹션은 순서 없는 목록을 포함하고 있습니다.

### 링크 예시

이메일: longemailaddress@verylongdomainname.com
웹사이트: https://verylongwebsiteaddress.com/very/long/path/to/some/page

## 마무리

이것으로 긴 텍스트 예시를 마칩니다.`,
  },
};
