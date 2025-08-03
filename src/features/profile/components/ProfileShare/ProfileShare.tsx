import React from 'react';

import type { ProfileUser } from '@/api';

import { ShareModal } from './ShareModal';

interface ProfileShareProps {
  profile: ProfileUser;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileShare({ profile, isOpen, onClose }: ProfileShareProps) {
  return <ShareModal profile={profile} isOpen={isOpen} onClose={onClose} />;
}
