export function generateProfileUrl(userId: number | string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/profile/${userId}`;
  }
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/profile/${userId}`;
}

export function generateQRCodeValue(userId: number | string): string {
  return generateProfileUrl(userId);
}

export function generateShareText(nickname: string): string {
  return `${nickname}님의 UFO-Fi 프로필을 확인해보세요!`;
}

export function generateShareTitle(nickname: string): string {
  return `${nickname}의 프로필`;
}
