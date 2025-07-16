'use client';

import { useEffect, useState } from 'react';

export function useFilterState() {
  const [data, setData] = useState([5]);
  const [range, setRange] = useState([0, 100]);

  const [minData, setMinData] = useState(0);
  const [maxData, setMaxData] = useState(10);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  useEffect(() => {
    setData([5]);
    setRange([0, 100]);
    setMinData(0);
    setMaxData(10);
    setMinValue(0);
    setMaxValue(100);
  }, []);

  return {
    data,
    range,
    minData,
    maxData,
    minValue,
    maxValue,
    setData,
    setRange,
    setMinData,
    setMaxData,
    setMinValue,
    setMaxValue,
  };
}
