// src/api/mypage/mypage.api.ts
import axiosInstance from '../axios';
import { MypageResponse } from './mypageUser.types';

export const getMypageUserAPI = async (): Promise<MypageResponse['content'] | undefined> => {
  try {
    const response = await axiosInstance.get('/v1/mypage', {
      withCredentials: true,
      headers: {
        Accept: '*/*',
      },
    });
    return response.data.content;
  } catch (error) {
    console.error('마이페이지 나의 프로필 조회 실패:', error);
  }
};
