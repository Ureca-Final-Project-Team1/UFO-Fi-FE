import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 컴포넌트입니다. usePagination 훅을 사용하여 페이지 번호 배열을 생성합니다.',
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
