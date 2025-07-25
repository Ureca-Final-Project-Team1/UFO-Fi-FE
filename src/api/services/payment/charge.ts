import { apiRequest } from '@/api/client/axios';
import type {
  PaymentRequest,
  PaymentResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
} from '@/api/types/payment';

export const paymentAPI = {
  // 1단계: 충전 요청
  async charge(data: PaymentRequest): Promise<PaymentResponse> {
    const response = await apiRequest.post<{ content: PaymentResponse }>(
      '/v1/mypage/zet-charges',
      data,
    );
    return response.data.content;
  },

  // 2단계: 결제 승인 확인
  async confirm(data: PaymentConfirmRequest): Promise<PaymentConfirmResponse> {
    const response = await apiRequest.post<{ content: PaymentConfirmResponse }>(
      '/v1/payment/confirm',
      data,
    );
    return response.data.content;
  },
};
