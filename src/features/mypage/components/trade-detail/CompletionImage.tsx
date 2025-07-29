import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants';

export const CompletionImage = () => {
  return (
    <div className="relative flex justify-center mt-auto">
      <Image
        src={IMAGE_PATHS['AL_COMPLETE']}
        alt="avatar"
        width={150}
        height={150}
        className="absolute -top-11"
      />
      <Image
        src={IMAGE_PATHS['MY_PLANET_HALF']}
        alt="my-planet"
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  );
};
