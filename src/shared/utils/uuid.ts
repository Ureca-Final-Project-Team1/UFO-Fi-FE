// UUID v4 생성 함수
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // crypto.getRandomValues 사용
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // UUID v4 포맷 적용
  array[6] = (array[6] & 0x0f) | 0x40;
  array[8] = (array[8] & 0x3f) | 0x80;

  const hex = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// 주문번호 생성
export function generateOrderId(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `UFO-${timestamp}-${random}`.toUpperCase();
}

// 토스페이먼츠 고객키 생성 (2-50자, 영문 대소문자, 숫자, -, _, =, ., @ 만 허용)
export function generateCustomerKey(userId?: string): string {
  if (userId) {
    // 사용자 ID가 있는 경우, 안전한 형태로 변환
    const sanitized = userId
      .replace(/[^a-zA-Z0-9\-_.@]/g, '') // 허용된 문자만 남기기
      .substring(0, 20); // 최대 20자로 제한

    if (sanitized.length >= 2) {
      return `user_${sanitized}`;
    }
  }

  // 기본값: 랜덤 고객키 생성
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `customer_${timestamp}_${random}`;
}

// 사용 예시
// const orderId = generateOrderId(); // "UFO-1703123456789-A1B2C3"
// const customerKey = generateCustomerKey(); // "customer_1703123456789_a1b2c3"
// const customerKey = generateCustomerKey('user123'); // "user_user123"
