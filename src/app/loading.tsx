'use client';

import { useState, useEffect } from 'react';

import { Loading } from '@/shared';

export default function AppLoading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return <Loading variant="default" message="페이지를 불러오는 중..." fullScreen />;
}
