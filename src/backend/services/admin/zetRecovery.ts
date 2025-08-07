import { apiRequest } from '@/backend/client/axios';
import type {
  ZetRecoveryRequest,
  ZetRecoveryResponse,
  ZetChargeLogRequest,
  ZetChargeLogResponse,
  ZetChargeLogDetailResponse,
} from '@/backend/types/zetRecovery';
import { API_ENDPOINTS } from '@/constants';

export const zetRecoveryAPI = {
  // ZET 복구 처리
  async recoverZet(data: ZetRecoveryRequest): Promise<ZetRecoveryResponse> {
    const response = await apiRequest.post<ZetRecoveryResponse>(
      API_ENDPOINTS.PAYMENT.RECOVERY,
      data,
    );
    return response.data;
  },

  // ZET 충전 내역 로그 조회 (페이지네이션)
  async getChargeLogs(params?: ZetChargeLogRequest): Promise<ZetChargeLogResponse> {
    const response = await apiRequest.get<ZetChargeLogResponse>('/v1/admin/zet-charge-logs', {
      params: {
        page: params?.page || 0,
        size: params?.size || 10,
        startDate: params?.startDate,
        endDate: params?.endDate,
        status: params?.status,
        userId: params?.userId,
      },
    });
    return response.data;
  },

  // ZET 충전 로그 상세 조회
  async getChargeLogDetail(logId: number): Promise<ZetChargeLogDetailResponse> {
    const response = await apiRequest.get<ZetChargeLogDetailResponse>(
      `/v1/admin/zet-charge-logs/${logId}`,
    );
    return response.data;
  },

  // ZET 충전 통계 조회 (TODO: 더미데이터, API 안들어오면 제거하기)
  async getChargeStatistics(params?: { startDate?: string; endDate?: string }) {
    const response = await apiRequest.get('/v1/admin/zet-charge-statistics', {
      params,
    });
    return response.data;
  },
};
