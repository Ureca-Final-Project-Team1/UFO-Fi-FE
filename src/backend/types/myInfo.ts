export interface MyInfoResponse {
  statusCode: number;
  message: string;
  content: {
    nickname: string;
    email: string;
    sellMobileDataCapacityGb: number;
    sellableDataAmount: number;
    zetAsset: number;
    profileImageUrl: string;
  };
}
