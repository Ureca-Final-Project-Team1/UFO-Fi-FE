'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import '@/styles/globals.css';

import { signupProfileSchema, SignupProfileSchema } from '@/schemas/signupSchema';
import { Button, PhoneInput } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { useSignupStore } from '@/stores/useSignupStore';

const Page = () => {
  const router = useRouter();
  const { setForm } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProfileSchema>({
    resolver: zodResolver(signupProfileSchema),
  });

  const onSubmit = (data: SignupProfileSchema) => {
    setForm(data);
    router.push('/signup/plan');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-112px)] px-4 py-6"
    >
      <div className="flex flex-col justify-start items-start text-center gap-5 w-full h-full">
        <p className="body-20-bold">회원가입</p>

        <div className="flex flex-col gap-3 w-full text-left">
          <label className="flex items-center gap-5 body-16-bold">
            이름
            {errors.name && <p className="text-red-600 caption-10-medium">{errors.name.message}</p>}
          </label>
          <Input
            {...register('name')}
            className="caption-14-regular bg-white h-[50px] text-black placeholder-gray-400 rounded-sm w-full"
            placeholder="실명을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full text-left">
          <label className="flex items-center gap-5 body-16-bold">
            전화번호
            {errors.phoneNumber && (
              <p className="text-red-600 caption-10-medium">{errors.phoneNumber.message}</p>
            )}
          </label>
          <PhoneInput
            {...register('phoneNumber')}
            className="caption-14-regular bg-white h-[50px] text-black placeholder-gray-400 rounded-sm w-full"
            placeholder="010-XXXX-XXXX 형식으로 입력해주세요."
          />
        </div>
      </div>

      <Button type="submit" size="full-width" className="body-16-medium h-10 sm:h-14 text-white">
        다음
      </Button>
    </form>
  );
};

export default Page;
