// import { apiRequest } from '@/lib/axios';

/**
 * 판매 게시물 등록
 * @param {Object} params - 판매 등록 데이터
 * @param {string} params.title - 게시물 제목
 * @param {number} params.capacity - 판매 용량 (GB)
 * @param {number} params.pricePerGB - GB당 가격
 * @param {number} params.totalPrice - 총 판매 가격
 * @returns {Promise<Object>} 등록된 게시물 정보
 */
// export const postTrade = async (params) => {
//   try {
//     const response = await apiRequest.post('/posts', params);
//     return response.data;
//   } catch (error) {
//     console.error('판매 등록 API 에러:', error);
//     throw error;
//   }
// };
