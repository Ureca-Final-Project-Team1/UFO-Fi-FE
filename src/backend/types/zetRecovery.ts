import { SuccessApiResponse } from './api';

// ZET 복구 요청 타입
export interface ZetRecoveryRequest {
  userId: number;
  recoveryZet: number;
  orderId: string;
}

// ZET 복구 응답 내용 타입
export interface ZetRecoveryContent {
  success: boolean;
  userId: number;
  recoveryZet: number;
  orderId: string;
  recoveredAt?: string;
  adminId?: number;
}

// ZET 복구 응답 타입
export type ZetRecoveryResponse = SuccessApiResponse<ZetRecoveryContent>;

// ZET 충전 로그 관련 타입들
export interface ZetChargeLogRequest {
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  userId?: number;
}

export interface ZetChargeLogItem {
  id: number;
  orderId: string;
  userId: number;
  userName: string;
  amount: number;
  zetAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
  failReason?: string;
  tossPaymentKey?: string;
}

// 로그 상세 조회용 타입
export interface ZetPaymentRequestLog {
  orderId: string;
  userId: number;
  amount: number;
  paymentMethod: string;
  timestamp: string;
  // customerName?: string;
  // customerEmail?: string;
}

export interface ZetTossPaymentResponseLog {
  paymentKey?: string | null;
  orderId: string;
  status: string;
  totalAmount: number;
  method: string;
  approvedAt?: string;
  failedAt?: string;
  failReason?: string;
  transactionKey?: string;
  // receiptUrl?: string;
}

export interface ZetStatusTransition {
  status: string;
  timestamp: string;
  description: string;
}

export interface ZetChargeLogDetail {
  id: number;
  title: string;
  request: ZetPaymentRequestLog;
  tossResponse: ZetTossPaymentResponseLog;
  statusTransition: ZetStatusTransition[];
}

export interface ZetChargeLogContent {
  content: ZetChargeLogItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type ZetChargeLogResponse = SuccessApiResponse<ZetChargeLogContent>;
export type ZetChargeLogDetailResponse = SuccessApiResponse<ZetChargeLogDetail>;
