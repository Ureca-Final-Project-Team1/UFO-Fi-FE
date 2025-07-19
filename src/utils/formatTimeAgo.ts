/**
 * 날짜 문자열을 "N분전", "N시간전", "N일전" 형태로 변환하는 유틸 함수
 *
 * @param dateString - ISO 형식의 날짜 문자열 (예: "2025-07-19T13:12:13.875Z")
 * @returns 상대적인 시간 표현 (예: "30분전", "2시간전", "3일전")
 */
export function formatTimeAgo(dateString: string): string {
  // 현재 시간
  const now = new Date();

  // 전달받은 날짜 문자열을 Date 객체로 변환
  const past = new Date(dateString);

  // 현재 시간과 과거 시간의 차이 (밀리초)
  const diffMs = now.getTime() - past.getTime();

  // 밀리초를 분, 시간, 일 단위로 변환
  const diffMins = Math.floor(diffMs / (1000 * 60)); // 분 단위
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 일 단위

  // 시간 차이에 따라 적절한 형태로 반환
  if (diffMins < 60) {
    // 1시간 미만: "N분전"
    return `${diffMins}분전`;
  } else if (diffHours < 24) {
    // 1일 미만: "N시간전"
    return `${diffHours}시간전`;
  } else {
    // 1일 이상: "N일전"
    return `${diffDays}일전`;
  }
}
