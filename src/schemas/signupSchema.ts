import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다'),
});
