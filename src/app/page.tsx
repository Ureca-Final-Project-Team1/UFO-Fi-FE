import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Image
          src={IMAGE_PATHS.MAIN}
          alt="404 Not Found"
          width={320}
          height={360}
          className="mx-auto mb-1"
          priority
        />
      </div>
    </div>
  );
}
