// 숫자만 남기는 유틸 함수
export function getOnlyNumbers(value: string): string {
  return value.replace(/\D/g, '');
}
