export interface PaymentRequest {
  orderId: string;
  packageName: string;
  amount: number;
}

export interface PaymentResponse {
  name: string;
  email: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmResponse {
  receiptUrl: string;
  currentZetBalance?: number;
}

export interface TossPaymentSuccessParams {
  paymentKey: string;
  orderId: string;
  amount: string;
}

export interface TossPaymentFailParams {
  code: string;
  message: string;
  orderId?: string;
}
