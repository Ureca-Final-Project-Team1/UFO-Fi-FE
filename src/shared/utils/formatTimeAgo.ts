/**
 * 날짜 문자열을 "N분 전", "N시간 전", "N일 전" 등의 상대적인 시간 표현으로 변환하는 유틸 함수
 *
 * @param dateString - ISO 형식의 날짜 문자열 (예: "2025-07-19T13:12:13.875Z")
 * @returns 상대적인 시간 표현 문자열 (예: "방금 전", "30분 전", "2시간 전", "3일 전", "4주 전", "2개월 전", "1년 전")
 */
export function formatTimeAgo(dateString: string): string {
  const now = new Date(); // 현재 시간
  const date = new Date(dateString); // 입력된 시간
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이

  // 1분 미만: "방금 전"
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365);

  return `${diffInYears}년 전`;
}
