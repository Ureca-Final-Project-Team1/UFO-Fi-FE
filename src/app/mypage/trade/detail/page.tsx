import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants';
import { Title } from '@/shared';

export default function MyTradeDetailPage() {
  return (
    <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
      <Title title="주문 상세" iconVariant="back" />
      <div className="w-full flex items-center justify-center mt-8">
        <Image src={IMAGE_PATHS['RECEIPT']} alt="receipt" width={350} height={350} />
      </div>
      <div className="flex flex-row justify-center mt-2 relative">
        <Image
          src={IMAGE_PATHS['AL_COMPLETE']}
          alt="avatar"
          width={150}
          height={150}
          className="absolute mx-auto mb-10 top-10"
        />
        <Image
          src={IMAGE_PATHS['MY_PLANET']}
          alt="my-planet"
          width={390}
          height={390}
          className="mx-auto mt-10"
        />
      </div>
    </div>
  );
}
