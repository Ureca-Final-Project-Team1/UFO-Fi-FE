'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import '@/styles/globals.css';

import { Button } from '@/components';
import { Input } from '@/components/ui/input/Input';
import { useSignupStore } from '@/stores/useSignupStore';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다'),
});
type FormValues = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const { setForm } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setForm(data);
    router.push('/signup/plan');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center h-full w-full"
    >
      <div className="flex flex-[0.9] flex-col justify-start items-start text-center gap-5 w-full h-full">
        <p className="body-20-bold">회원가입</p>

        <div className="flex flex-col gap-3 w-full text-left">
          <label className="body-16-bold">이름</label>
          <Input
            {...register('name')}
            className="Label2_14_M bg-white h-[50px] text-black placeholder-gray-400 rounded-sm w-full"
            placeholder="실명을 입력해주세요."
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-3 w-full text-left">
          <label className="body-16-bold">전화번호</label>
          <Input
            {...register('phone')}
            className="Label2_14_M bg-white h-[50px] text-black placeholder-gray-400 rounded-sm w-full"
            placeholder="010-XXXX-XXXX 형식으로 입력해주세요."
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
      </div>

      <Button type="submit" size="full-width" className="body-16-medium h-10 sm:h-14 text-white">
        다음
      </Button>
    </form>
  );
};

export default Page;
