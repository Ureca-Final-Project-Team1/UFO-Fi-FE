import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UPagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 컴포넌트입니다. usePagination 훅을 사용하여 페이지 번호 배열을 생성합니다.',
      },
    },
  },
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    function DefaultPaginationStory() {
      const [page, setPage] = useState(1);
      return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
    }
    return <DefaultPaginationStory />;
  },
};

export const FewPages: Story = {
  render: () => {
    function FewPagesStory() {
      const [page, setPage] = useState(1);
      return <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />;
    }
    return <FewPagesStory />;
  },
};

export const ManyPages: Story = {
  render: () => {
    function ManyPagesStory() {
      const [page, setPage] = useState(15);
      return (
        <Pagination currentPage={page} totalPages={30} onPageChange={setPage} siblingCount={2} />
      );
    }
    return <ManyPagesStory />;
  },
};
