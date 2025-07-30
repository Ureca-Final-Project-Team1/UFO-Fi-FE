/**
 * 업적 달성 날짜를 한국어 형식으로 포맷팅합니다.
 * @param isAchieve 업적 달성 여부
 * @param achievedAt 업적 달성 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 또는 null
 */
export function getAchievedDate(isAchieve?: boolean, achievedAt?: string | null): string | null {
  if (!isAchieve || !achievedAt || typeof achievedAt !== 'string') return null;

  const safeDateStr = achievedAt.replace(' ', 'T');
  const date = new Date(safeDateStr);

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${achievedAt}`);
    return null;
  }

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
