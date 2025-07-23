import Image from 'next/image';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { Title } from '@/shared';
export default function purchasePage() {
  return (
    <div>
      <Title title="데이터 구매하기" iconVariant="back" />
      <div className="flex items-left text-white">
        <h1 className="text-2xl font-bold mb-4">
          이 거래는 <br /> UFO-Fi가 중개합니다.
        </h1>
      </div>
      <div>
        <div className="w-[25rem] h-[6rem] bg-white rounded-md mx-auto mb-4">
          <div className="flex flex-row items-center justify-left w-full">
            <Image src={ICON_PATHS['UFO_LOGO']} width={30} height={30} alt="ufo" />
            <p className="text-left text-black">UFO-Fi</p>
          </div>
          <h3 className="text-black text-center">유포파이에게 데이터 중개 맡기세요!</h3>
        </div>
        <div
          className="w-[20rem] h-[6rem] bg-gray-500 rounded-md mx-auto mb-4 absolute"
          style={{ top: '10rem', left: '9rem', zIndex: -1 }}
        ></div>
      </div>
      <Image src={IMAGE_PATHS['AL_COMPLETE']} width={300} height={300} alt="alien-search" />
    </div>
  );
}
