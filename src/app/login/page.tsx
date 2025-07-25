'use client';

import Image from 'next/image';
import '@/styles/globals.css';
// import { useRouter } from 'next/navigation';

import { ICON_PATHS } from '@/constants/icons';
import { Button } from '@/shared/ui';

const LoginPage = () => {
  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pb-[20px]">
      <div className="flex flex-[0.9] flex-col justify-center items-center text-center gap-5 w-full h-full pb-16">
        <div className="flex flex-col justify-center items-center w-[300px] h-[80px] gap-8">
          <Image src={ICON_PATHS['UFO_LOGO']} width={134.5} height={136} alt="ufo" />
          <h1 className="pyeongchangpeace-title-1">UFO-Fi</h1>
          <h3 className="pyeongchangpeace-title-2 text-teal-300">
            데이터는 부족해도, 은하는 연결되어 있다.
          </h3>
        </div>
      </div>
      <Button
        className="hover:cursor-pointer bg-[url('/images/kakao_login_button.png')] bg-no-repeat bg-center bg-cover h-10 sm:h-14 max-w-[300px] sm:max-w-[360px]"
        size="full-width"
        onClick={handleKakaoLogin}
      />
    </div>
  );
};

export default LoginPage;
