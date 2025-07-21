type ProfileVectorInput = {
  avg_zet: number;
  data_gb: number;
  trade_frequency: number;
  last_trade_diff_days: number | null;
};

export function getVectorFromProfile(profile: ProfileVectorInput): number[] {
  const normalizedAvgZet = profile.avg_zet / 1000; // 예상값: 0 ~ 5
  const normalizedDataGb = profile.data_gb / 10; // 예상값: 0 ~ 1
  const normalizedFrequency = Math.min(profile.trade_frequency / 100, 1); // capped at 1
  const recentTradeScore =
    profile.last_trade_diff_days === null ? 1 : 1 / (profile.last_trade_diff_days + 1); // 최근일수록 1에 가까움

  return [
    parseFloat(normalizedAvgZet.toFixed(3)),
    parseFloat(normalizedDataGb.toFixed(3)),
    parseFloat(normalizedFrequency.toFixed(3)),
    parseFloat(recentTradeScore.toFixed(3)),
  ];
}
