'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import '@/styles/globals.css';

import { Stepper } from '@/features/signup/components';
import { signupProfileSchema, SignupProfileSchema } from '@/schemas/signupSchema';
import { Button, PhoneInput, Input, Title } from '@/shared';
import { useSignupStore } from '@/stores/useSignupStore';

const ProfilePage = () => {
  const router = useRouter();
  const { setForm, name, phoneNumber } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProfileSchema>({
    resolver: zodResolver(signupProfileSchema),
    defaultValues: {
      name: name || '',
      phoneNumber: phoneNumber || '',
    },
  });

  const onSubmit = (data: SignupProfileSchema) => {
    setForm(data);
    router.push('/signup/plan');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-6">
        <div className="flex-1 flex flex-col justify-start items-start">
          <Title iconVariant="back" title="회원가입" className="body-20-bold w-full pl-0 mb-6" />

          <div className="flex flex-col gap-6 w-full">
            <Stepper step={1} content="정보 입력" className="mb-5" />
            <p className="heading-24-bold ml-2">
              가입을 위한 정보를
              <br />
              입력해주세요
            </p>
            <div className="flex flex-col gap-3 w-full text-left">
              <label className="flex items-center gap-5 body-16-bold">
                이름
                {errors.name && (
                  <p className="text-red-600 caption-10-medium">{errors.name.message}</p>
                )}
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
                placeholder="숫자만 입력해주세요. (- 제외)"
              />
            </div>
          </div>
        </div>

        {/* 고정된 하단 버튼 */}
        <div className="sticky bottom-0 bg-inherit pb-4">
          <Button type="submit" size="full-width" className="body-16-medium h-14 text-white">
            다음
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
