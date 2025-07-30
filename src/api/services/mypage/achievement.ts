export const achievementsAPI = {
  async updateAchievements() {
    const res = await fetch('/api/achievements/update', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || '업적 업데이트에 실패했습니다.');
    }

    return data;
  },
};
