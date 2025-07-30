type ProfileVectorInput = {
  avg_zet: number;
  data_gb: number;
  trade_frequency: number;
  recent_post_days: number;
};

export function getVectorFromProfile(profile: ProfileVectorInput): number[] {
  const normalizedAvgZet = profile.avg_zet / 1000; // 예상값: 0 ~ 5
  const normalizedDataGb = profile.data_gb / 10; // 예상값: 0 ~ 1
  const normalizedFrequency = Math.min(profile.trade_frequency / 100, 1); // capped at 1

  // 최근 게시글이 작성된 지 며칠 지났는지 → 가까울수록 1에 가까움
  const recentPostScore = 1 / (profile.recent_post_days + 1); // 최소값 보호

  return [
    parseFloat(normalizedAvgZet.toFixed(3)),
    parseFloat(normalizedDataGb.toFixed(3)),
    parseFloat(normalizedFrequency.toFixed(3)),
    parseFloat(recentPostScore.toFixed(3)),
  ];
}
