import type { Metadata } from 'next';

import { profileAPI } from '@/backend';
import { IMAGE_PATHS } from '@/constants/images';

interface Props {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { userId } = await params;
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      throw new Error('Invalid userId');
    }

    const profile = await profileAPI.getProfileData(userIdNumber);

    const title = `${profile.nickname}님의 판매 데이터`;
    const description = `${profile.nickname}님의 UFO-Fi 판매중인 데이터를 확인해보세요.`;
    const datalistUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userId}/datalist`;
    const imageUrl = profile.profileImageUrl || IMAGE_PATHS.AVATAR;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: datalistUrl,
        images: [imageUrl],
        siteName: 'UFO-Fi',
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: datalistUrl,
      },
    };
  } catch {
    return {
      title: '판매중인 데이터 - UFO-Fi',
      description: 'UFO-Fi 판매중인 데이터를 확인해보세요.',
    };
  }
}

export default function ProfileDataListLayout({ children }: Props) {
  return <>{children}</>;
}
