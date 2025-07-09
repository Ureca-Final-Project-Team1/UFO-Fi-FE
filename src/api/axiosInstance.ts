import { apiRequest } from '@/lib/axios';

const axiosInstance = () => {
  return apiRequest;
};

export default axiosInstance;
