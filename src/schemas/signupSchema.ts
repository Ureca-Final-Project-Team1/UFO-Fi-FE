import z from 'zod';

export const signupProfileSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phoneNumber: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .regex(/^010-\d{4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다'),
});
export type SignupProfileSchema = z.infer<typeof signupProfileSchema>;

export const signupPlanSchema = z.object({
  carrier: z.string().min(1, '통신사를 선택해주세요.'),
  planName: z.string().min(1, '요금제를 선택해주세요.'),
});
export type SignupPlanSchema = z.infer<typeof signupPlanSchema>;
