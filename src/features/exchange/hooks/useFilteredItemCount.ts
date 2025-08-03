'use client';

import { useEffect, useState } from 'react';

export function useFilteredItemCount() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    setCount(10);
  }, []);

  return {
    count,
    setCount,
  };
}
