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
export interface ZetChargeLogItem {
  id: number;
  orderId: string;
  userId: number;
  username: string;
  price: number;
  paymentStatus: 'DONE' | 'FAIL' | 'IN_PROGRESS' | 'READY' | 'TIMEOUT';
  requestedAt: string;
}

// 로그 상세 조회용 타입
export interface ZetPaymentRequestLog {
  orderId: string;
  userId: number;
  confirmReq: string;
  confirmResult: string;
  methodTrace: string;
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
  orderId: string;
  confirmReq: string;
  confirmResult: string;
  methodTrace: string;
}

export interface ZetChargeLogContent {
  paymentBackOfficesRes: ZetChargeLogItem[];
}

export interface ZetChargeLogResponseContent {
  paymentBackOfficesRes: ZetChargeLogItem[];
}

export type ZetChargeLogResponse = SuccessApiResponse<ZetChargeLogContent>;
export type ZetChargeLogDetailResponse = SuccessApiResponse<ZetChargeLogDetail>;
