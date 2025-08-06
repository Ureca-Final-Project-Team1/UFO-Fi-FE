import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 컴포넌트입니다. usePagination 훅을 사용하여 페이지 번호 배열을 생성합니다. 다양한 variants를 지원합니다.',
      },
    },
  },
  argTypes: {
    page: {
      control: 'number',
      description: '현재 페이지 번호',
    },
    total: {
      control: 'number',
      description: '전체 페이지 수',
    },
    siblingCount: {
      control: 'number',
      description: '현재 페이지 양 옆에 보여줄 페이지 수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'elevated', 'compact', 'outlined'],
      description: '메인 컨테이너 스타일',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '컴포넌트 크기',
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '정렬 방식',
    },
    showFirstLast: {
      control: 'boolean',
      description: '첫/마지막 페이지 버튼 표시',
    },
    showPrevNext: {
      control: 'boolean',
      description: '이전/다음 페이지 버튼 표시',
    },
    showPageNumbers: {
      control: 'boolean',
      description: '페이지 번호 표시',
    },
    buttonActiveVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'custom'],
      description: '활성 페이지 버튼 스타일',
    },
    navigationVariant: {
      control: 'select',
      options: ['default', 'minimal', 'outlined', 'filled', 'ghost'],
      description: '네비게이션 버튼 스타일',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    function DefaultPaginationStory() {
      const [page, setPage] = useState(1);
      return <Pagination page={page} total={10} onChange={setPage} />;
    }
    return <DefaultPaginationStory />;
  },
};

export const FewPages: Story = {
  render: () => {
    function FewPagesStory() {
      const [page, setPage] = useState(1);
      return <Pagination page={page} total={3} onChange={setPage} />;
    }
    return <FewPagesStory />;
  },
};

export const ManyPages: Story = {
  render: () => {
    function ManyPagesStory() {
      const [page, setPage] = useState(15);
      return <Pagination page={page} total={30} onChange={setPage} siblingCount={2} />;
    }
    return <ManyPagesStory />;
  },
};

export const Elevated: Story = {
  render: () => {
    function ElevatedStory() {
      const [page, setPage] = useState(5);
      return (
        <Pagination
          page={page}
          total={20}
          onChange={setPage}
          variant="elevated"
          buttonActiveVariant="primary"
        />
      );
    }
    return <ElevatedStory />;
  },
};

export const Minimal: Story = {
  render: () => {
    function MinimalStory() {
      const [page, setPage] = useState(3);
      return (
        <Pagination
          page={page}
          total={15}
          onChange={setPage}
          variant="minimal"
          navigationVariant="ghost"
          buttonVariant="ghost"
          buttonActiveVariant="primary"
        />
      );
    }
    return <MinimalStory />;
  },
};

export const Compact: Story = {
  render: () => {
    function CompactStory() {
      const [page, setPage] = useState(2);
      return (
        <Pagination
          page={page}
          total={12}
          onChange={setPage}
          variant="compact"
          size="sm"
          buttonSize="sm"
          navigationSize="sm"
        />
      );
    }
    return <CompactStory />;
  },
};

export const Large: Story = {
  render: () => {
    function LargeStory() {
      const [page, setPage] = useState(7);
      return (
        <Pagination
          page={page}
          total={25}
          onChange={setPage}
          size="lg"
          buttonSize="lg"
          navigationSize="lg"
          buttonActiveVariant="accent"
        />
      );
    }
    return <LargeStory />;
  },
};

export const CustomColors: Story = {
  render: () => {
    function CustomColorsStory() {
      const [page, setPage] = useState(4);
      return (
        <Pagination
          page={page}
          total={18}
          onChange={setPage}
          buttonActiveVariant="custom"
          dotsColor="primary"
          navigationVariant="outlined"
        />
      );
    }
    return <CustomColorsStory />;
  },
};

export const NavigationOnly: Story = {
  render: () => {
    function NavigationOnlyStory() {
      const [page, setPage] = useState(1);
      return (
        <Pagination
          page={page}
          total={8}
          onChange={setPage}
          showPageNumbers={false}
          navigationVariant="filled"
        />
      );
    }
    return <NavigationOnlyStory />;
  },
};

export const NumbersOnly: Story = {
  render: () => {
    function NumbersOnlyStory() {
      const [page, setPage] = useState(3);
      return (
        <Pagination
          page={page}
          total={6}
          onChange={setPage}
          showFirstLast={false}
          showPrevNext={false}
          buttonVariant="outlined"
          buttonActiveVariant="secondary"
        />
      );
    }
    return <NumbersOnlyStory />;
  },
};

export const LeftAligned: Story = {
  render: () => {
    function LeftAlignedStory() {
      const [page, setPage] = useState(2);
      return (
        <div className="w-full">
          <Pagination
            page={page}
            total={14}
            onChange={setPage}
            alignment="left"
            variant="outlined"
          />
        </div>
      );
    }
    return <LeftAlignedStory />;
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    function CustomStylingStory() {
      const [page, setPage] = useState(5);
      return (
        <Pagination
          page={page}
          total={20}
          onChange={setPage}
          className="bg-gray-100 p-4 rounded-lg"
          variant="elevated"
          buttonActiveVariant="accent"
        />
      );
    }
    return <CustomStylingStory />;
  },
};

export const SinglePage: Story = {
  render: () => {
    function SinglePageStory() {
      const [page, setPage] = useState(1);
      return <Pagination page={page} total={1} onChange={setPage} />;
    }
    return <SinglePageStory />;
  },
};
