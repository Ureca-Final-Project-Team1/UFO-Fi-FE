import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants';

export const CompletionImage = () => {
  return (
    <div className="flex flex-row justify-center mt-8 relative">
      <Image
        src={IMAGE_PATHS['AL_COMPLETE']}
        alt="avatar"
        width={150}
        height={150}
        className="absolute mx-auto mb-10 -top-10"
      />
      <Image
        src={IMAGE_PATHS['MY_PLANET']}
        alt="my-planet"
        width={390}
        height={390}
        className="mx-auto mt-10"
      />
    </div>
  );
};
