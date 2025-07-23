import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UPagination',
  component: Pagination,
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
