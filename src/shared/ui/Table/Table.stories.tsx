import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Table } from '@/shared';

import { Icon } from '../Icons/Icon';

type TestRow = {
  id: number;
  nickname: string;
  name: string;
  email: string;
  reportedCount: number;
  disabledCount: number;
  status: string;
};

const defaultActions = {
  render: () => (
    <div className="flex gap-2 justify-center">
      <Icon name="CircleMinus" className="size-5" color="red" />
      <Icon name="RotateCcw" className="size-4" color="green" />
    </div>
  ),
};

const columns: {
  Header: string;
  accessor: keyof TestRow | 'actions';
  render?: (value: unknown, row: TestRow) => React.ReactNode;
}[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: '닉네임', accessor: 'nickname' },
  { Header: '이름', accessor: 'name' },
  { Header: '이메일', accessor: 'email' },
  { Header: '신고받은 게시물 수', accessor: 'reportedCount' },
  { Header: '비활성화 게시물 수', accessor: 'disabledCount' },
  { Header: '상태', accessor: 'status' },
  {
    Header: '관리',
    accessor: 'actions',
    render: () => defaultActions.render(),
  },
];

const generateTestData = (count: number): TestRow[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    nickname: `user${index + 1}`,
    name: `사용자${index + 1}`,
    email: `user${index + 1}@example.com`,
    reportedCount: Math.floor(Math.random() * 100),
    disabledCount: Math.floor(Math.random() * 50),
    status: index % 3 === 0 ? '비활성화' : '활성화',
  }));
};

const data = generateTestData(25);

const meta: Meta<typeof Table<TestRow>> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '재사용 가능한 Table 컴포넌트입니다. 다양한 데이터 표시, 정렬, 필터링, 페이지네이션을 지원하며, 다양한 variants를 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'striped', 'compact', 'spacious'],
      description: '테이블 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '테이블 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '테이블 테마',
    },
    containerVariant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'striped', 'compact', 'spacious'],
      description: '컨테이너 스타일 변형',
    },
    containerTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '컨테이너 테마',
    },
    containerElevation: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: '컨테이너 그림자',
    },
    headerVariant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent', 'custom'],
      description: '헤더 스타일 변형',
    },
    headerSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '헤더 크기',
    },
    headerTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '헤더 테마',
    },
    rowVariant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'compact', 'spacious'],
      description: '행 스타일 변형',
    },
    rowSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '행 크기',
    },
    rowTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '행 테마',
    },
    cellAlignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'between'],
      description: '셀 정렬',
    },
    cellSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '셀 크기',
    },
    cellTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '셀 테마',
    },
    cellTruncate: {
      control: { type: 'boolean' },
      description: '셀 텍스트 자르기',
    },
    emptySize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '빈 상태 크기',
    },
    emptyTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '빈 상태 테마',
    },
    dividerVariant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent', 'custom'],
      description: '분할선 스타일 변형',
    },
    dividerTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'custom'],
      description: '분할선 테마',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table<TestRow>>;

export const Default: Story = {
  args: {
    columns,
    data,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Table 컴포넌트입니다.',
      },
    },
  },
};

export const WithPagination: Story = {
  render: function WithPaginationStory() {
    return (
      <div className="p-6">
        <Table columns={columns} data={data} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '페이지네이션이 포함된 테이블입니다.',
      },
    },
  },
};

export const LargeDataset: Story = {
  render: function LargeDatasetStory() {
    const largeData = generateTestData(100);
    return (
      <div className="p-6">
        <Table columns={columns} data={largeData} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '대용량 데이터셋을 표시하는 테이블입니다.',
      },
    },
  },
};

export const SmallDataset: Story = {
  render: function SmallDatasetStory() {
    const smallData = generateTestData(5);
    return (
      <div className="p-6">
        <Table columns={columns} data={smallData} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '소량 데이터셋을 표시하는 테이블입니다.',
      },
    },
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="lg" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Extra Large Size</h3>
        <Table columns={columns} data={data.slice(0, 3)} size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 테이블을 보여줍니다.',
      },
    },
  },
};

// 다양한 변형
export const Variants: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Variant</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="default" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Bordered Variant</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="bordered" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Striped Variant</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="striped" rowVariant="striped" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Variant</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="compact" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacious Variant</h3>
        <Table columns={columns} data={data.slice(0, 3)} variant="spacious" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스타일 변형의 테이블을 보여줍니다.',
      },
    },
  },
};

// 다양한 헤더 스타일
export const HeaderVariants: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Header</h3>
        <Table columns={columns} data={data.slice(0, 3)} headerVariant="default" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Header</h3>
        <Table columns={columns} data={data.slice(0, 3)} headerVariant="primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Header</h3>
        <Table columns={columns} data={data.slice(0, 3)} headerVariant="secondary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Accent Header</h3>
        <Table columns={columns} data={data.slice(0, 3)} headerVariant="accent" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Header</h3>
        <Table columns={columns} data={data.slice(0, 3)} headerVariant="custom" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 헤더 스타일의 테이블을 보여줍니다.',
      },
    },
  },
};

// 다양한 셀 정렬
export const CellAlignments: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Left Alignment (Default)</h3>
        <Table columns={columns} data={data.slice(0, 3)} cellAlignment="left" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Alignment</h3>
        <Table columns={columns} data={data.slice(0, 3)} cellAlignment="center" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Right Alignment</h3>
        <Table columns={columns} data={data.slice(0, 3)} cellAlignment="right" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Between Alignment</h3>
        <Table columns={columns} data={data.slice(0, 3)} cellAlignment="between" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 셀 정렬 방식을 보여줍니다.',
      },
    },
  },
};

// 다양한 그림자
export const Elevations: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">No Elevation</h3>
        <Table columns={columns} data={data.slice(0, 3)} containerElevation="none" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Elevation</h3>
        <Table columns={columns} data={data.slice(0, 3)} containerElevation="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Elevation (Default)</h3>
        <Table columns={columns} data={data.slice(0, 3)} containerElevation="md" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Elevation</h3>
        <Table columns={columns} data={data.slice(0, 3)} containerElevation="lg" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Extra Large Elevation</h3>
        <Table columns={columns} data={data.slice(0, 3)} containerElevation="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 그림자 효과를 보여줍니다.',
      },
    },
  },
};

// 빈 상태
export const EmptyState: Story = {
  render: () => (
    <div className="p-6">
      <Table columns={columns} data={[]} emptyMessage="데이터가 없습니다." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '데이터가 없을 때의 빈 상태를 보여줍니다.',
      },
    },
  },
};

// 로딩 상태
export const LoadingState: Story = {
  render: () => (
    <div className="p-6">
      <Table columns={columns} data={[]} isLoading={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '데이터 로딩 중일 때의 상태를 보여줍니다.',
      },
    },
  },
};
