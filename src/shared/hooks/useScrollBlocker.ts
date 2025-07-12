// 'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect } from 'react';

// interface ScrollBlockers {
//   preventScroll: (e: Event) => boolean;
//   keydownHandler: (e: KeyboardEvent) => void;
// }

// declare global {
//   interface Window {
//     scrollBlockers?: ScrollBlockers;
//   }
// }

// export function useScrollBlocker() {
//   const pathname = usePathname();

//   useEffect(() => {
//     // eslint-disable-next-line no-console
//     console.log('Current pathname:', pathname);

//     const isNotFoundPage =
//       pathname === '/notfound' || pathname === '/not-found' || pathname === '/404';

//     // eslint-disable-next-line no-console
//     console.log('Is not found page:', isNotFoundPage);

//     if (isNotFoundPage) {
//       document.documentElement.classList.add('scroll-blocked');
//       document.body.classList.add('scroll-blocked');

//       const preventScroll = (e: Event) => {
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//       };

//       document.addEventListener('wheel', preventScroll, { passive: false });
//       document.addEventListener('touchmove', preventScroll, { passive: false });

//       const keydownHandler = (e: KeyboardEvent) => {
//         if (
//           e.key === 'ArrowUp' ||
//           e.key === 'ArrowDown' ||
//           e.key === 'PageUp' ||
//           e.key === 'PageDown' ||
//           e.key === 'Home' ||
//           e.key === 'End' ||
//           e.key === ' '
//         ) {
//           e.preventDefault();
//         }
//       };

//       document.addEventListener('keydown', keydownHandler);

//       window.scrollBlockers = {
//         preventScroll,
//         keydownHandler,
//       };
//     } else {
//       document.documentElement.classList.remove('scroll-blocked');
//       document.body.classList.remove('scroll-blocked');

//       const blockers = window.scrollBlockers;
//       if (blockers) {
//         document.removeEventListener('wheel', blockers.preventScroll);
//         document.removeEventListener('touchmove', blockers.preventScroll);
//         document.removeEventListener('keydown', blockers.keydownHandler);
//         delete window.scrollBlockers;
//       }
//     }

//     return () => {
//       document.documentElement.classList.remove('scroll-blocked');
//       document.body.classList.remove('scroll-blocked');

//       const blockers = window.scrollBlockers;
//       if (blockers) {
//         document.removeEventListener('wheel', blockers.preventScroll);
//         document.removeEventListener('touchmove', blockers.preventScroll);
//         document.removeEventListener('keydown', blockers.keydownHandler);
//         delete window.scrollBlockers;
//       }
//     };
//   }, [pathname]);
// }
