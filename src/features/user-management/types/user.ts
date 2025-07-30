import { BaseTableRow } from '@/shared';

export interface UserRow extends BaseTableRow {
  id: number;
  nickname: string;
  name: string;
  email: string;
  reportedCount: number;
  disabledCount: number;
  status: string;
  actions?: {
    deactivateIcon?: React.ReactNode;
    activateIcon?: React.ReactNode;
  };
}
