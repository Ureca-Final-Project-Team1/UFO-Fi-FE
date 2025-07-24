export interface getUserInfoResponse {
  statusCode: number;
  message: string;
  content: {
    role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_NO_INFO' | 'ROLE_REPORTED';
    phoneNumber: string;
  };
}
