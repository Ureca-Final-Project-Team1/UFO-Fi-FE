export interface PaymentRequest {
  orderId: string;
  packageName: string;
  amount: number;
  price: number;
}

export interface PaymentResponse {
  orderId: string;
  email: string;
  name: string;
  amount: number;
  price: number;
}

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
  price: number;
}

export interface PaymentConfirmResponse {
  amount: number;
  zetAsset: number;
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
