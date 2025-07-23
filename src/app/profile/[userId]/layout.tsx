import type { Metadata } from 'next';

import { profileAPI } from '@/api';
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

    const profile = await profileAPI.getProfile(userIdNumber);

    const title = `${profile.content.nickname}의 프로필`;
    const description = `${profile.content.nickname}님의 UFO-Fi 프로필을 확인해보세요.`;
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userId}`;
    const imageUrl = profile.content.profileImageUrl || IMAGE_PATHS.AVATAR;

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
  } catch (error) {
    console.error('generateMetadata error:', error);
    return {
      title: '사용자 프로필 - UFO-Fi',
      description: 'UFO-Fi 사용자 프로필을 확인해보세요.',
    };
  }
}

export default function ProfileLayout({ children }: Props) {
  return <div className="min-h-full w-full">{children}</div>;
}
