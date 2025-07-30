export function getAchievedDate(achievedAt?: string | null, isAchieve?: boolean) {
  if (!isAchieve || !achievedAt) return null;

  return new Date(achievedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
