// src/hooks/useScrollToTop.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export const useScrollToTop = (threshold: number = 300) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // window 스크롤과 main 컨테이너 스크롤 모두 체크
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const mainElement = document.querySelector('main');
      const mainScrollTop = mainElement?.scrollTop || 0;

      // 둘 중 하나라도 threshold를 넘으면 버튼 표시
      const shouldShow = windowScrollTop > threshold || mainScrollTop > threshold;
      setShow(shouldShow);
    };

    // window와 main 엘리먼트 모두에 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    // 초기 상태 체크
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    // main 엘리먼트가 있으면 해당 엘리먼트를, 없으면 window를 스크롤
    const mainElement = document.querySelector('main');
    if (mainElement && mainElement.scrollTop > 0) {
      mainElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return { show, scrollToTop };
};
