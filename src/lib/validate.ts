/**
 * 가격 유효성 검사 (일반)
 * @param price 검사할 가격
 * @returns 유효성 여부
 */
export const validatePrice = (price: number): boolean => {
  return typeof price === 'number' && price >= 0 && price <= 999999;
};

/**
 * 총 판매 가격 유효성 검사 (최소 1ZET)
 * @param totalPrice 검사할 총 판매 가격
 * @returns 유효성 여부
 */
export const validateTotalPrice = (totalPrice: number): boolean => {
  return typeof totalPrice === 'number' && totalPrice >= 1;
};

/**
 * 1GB당 가격 유효성 검사 (4자리 제한)
 * @param pricePerGB 검사할 1GB당 가격
 * @returns 유효성 여부
 */
export const validatePricePerGB = (pricePerGB: number): boolean => {
  return typeof pricePerGB === 'number' && pricePerGB > 0 && pricePerGB <= 9999;
};

/**
 * 용량 유효성 검사
 * @param capacity 검사할 용량
 * @param maxCapacity 최대 용량
 * @returns 유효성 여부
 */
export const validateCapacity = (capacity: number, maxCapacity: number): boolean => {
  return typeof capacity === 'number' && capacity > 0 && capacity <= maxCapacity;
};

/**
 * 제목 유효성 검사
 * @param title 검사할 제목
 * @returns 유효성 여부
 */
export const validateTitle = (title: string): boolean => {
  return typeof title === 'string' && title.trim().length > 0 && title.length <= 100;
};
