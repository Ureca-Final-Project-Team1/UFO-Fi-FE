// GB 라벨 생성 유틸
export function getGbLabel(i: number, steps: number, unit = 'GB') {
  if (i === 0) return `0${unit}`;
  if (i === steps) return `${steps}${unit}`;
  return i.toString();
}

// 슬라이더 범위 텍스트 생성 유틸
export function getRangeLabel([min, max]: number[], maxIndex = 20) {
  if (min === 0 && max !== maxIndex) return `${max}ZET 이하`;
  if (min !== 0 && max === maxIndex) return `${min}ZET 이상`;
  return `${min}ZET ~ ${max}ZET`;
}
