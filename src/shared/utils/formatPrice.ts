// 금액을 1,000 단위로 포맷팅하는 함수
import { getOnlyNumbers } from './getOnlyNumbers';

export function formatPrice(input: string): string {
  const onlyNums = getOnlyNumbers(input);
  if (!onlyNums) return '';
  return Number(onlyNums).toLocaleString('ko-KR');
}
