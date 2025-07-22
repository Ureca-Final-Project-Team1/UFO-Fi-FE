export interface getRoleResponse {
  statusCode: number;
  message: string;
  content: {
    role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_NO_INFO' | 'ROLE_REPORTED';
  };
}
