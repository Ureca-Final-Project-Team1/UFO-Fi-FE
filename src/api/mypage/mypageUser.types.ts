export interface MypageResponse {
  statusCode: number;
  message: string;
  content: {
    nickname: string;
    email: string | null;
    sellMobileDataCapacityGb: number;
    sellableDataAmount: number;
    zetAsset: number | null;
  };
}
