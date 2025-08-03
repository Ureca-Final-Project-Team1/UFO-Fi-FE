// 휴대폰 번호를 010-1234-5678 형태로 포맷팅하는 함수
import { getOnlyNumbers } from './getOnlyNumbers';

export function formatPhoneNumber(input: string): string {
  const onlyNums = getOnlyNumbers(input);
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
}
