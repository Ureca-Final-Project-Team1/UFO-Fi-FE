import React from 'react';

import { Table } from '@/shared/ui/Table/Table';

import { ProfanityRow } from '../types/profanity';

interface ProfanityTableProps {
  data: ProfanityRow[];
  onDeleteClick?: (row: ProfanityRow) => void;
}

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: '금칙어', accessor: 'word' },
  { Header: '금칙어 생성일', accessor: 'createdAt' },
  { Header: '삭제', accessor: 'actions' },
];

const ProfanityTable: React.FC<ProfanityTableProps> = ({ data, onDeleteClick }) => {
  return <Table<ProfanityRow> columns={columns} data={data} onDeleteClick={onDeleteClick} />;
};

export default ProfanityTable;
