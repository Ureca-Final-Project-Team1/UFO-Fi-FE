import type { Metadata } from 'next';

import { profileAPI } from '@/api';
import { IMAGE_PATHS } from '@/constants';

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

    const title = `${profile.nickname}의 프로필`;
    const description = `${profile.nickname}님의 UFO-Fi 프로필을 확인해보세요.`;
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userId}`;
    const imageUrl = profile.profileImageUrl || IMAGE_PATHS.AVATAR;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [imageUrl],
        url: profileUrl,
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
        canonical: profileUrl,
      },
    };
  } catch {
    return {
      title: '사용자 프로필 - UFO-Fi',
      description: 'UFO-Fi 사용자 프로필을 확인해보세요.',
    };
  }
}

export default function ProfileLayout({ children }: Props) {
  return <>{children}</>;
}
