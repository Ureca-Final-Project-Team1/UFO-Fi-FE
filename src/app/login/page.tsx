'use client';

import Image from 'next/image';
import '@/styles/globals.css';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared/ui';

const Page = () => {
  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full pb-[20px]">
      <div className="flex flex-[0.9] flex-col justify-center items-center text-center gap-5 w-full h-full pb-16">
        <Image src={IMAGE_PATHS['UFO_LOGIN']} width={134.5} height={136} alt="ufo" />
        <div className="flex flex-col gap-2">
          <p className="text-[58px] sm:text-[80px]">UFO-Fi</p>
          <p className="caption-14-bold sm:text-[20px] text-(--color-login-description)">
            데이터는 부족해도, 은하는 연결되어 있다.
          </p>
        </div>
      </div>
      <Button
        className="bg-[url('/images/kakao_login_button.png')] bg-no-repeat bg-center bg-cover h-10 sm:h-14 max-w-[300px] sm:max-w-[400px]"
        size="full-width"
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

export default Page;
