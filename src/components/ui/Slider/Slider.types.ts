export interface DataSliderProps {
  value: number[];
  onValueChange: (val: number[]) => void;
  showTicks?: boolean;
  showLabels?: boolean;
  minLabel?: React.ReactNode; // 최소값 라벨
  maxLabel?: React.ReactNode; // 최대값 라벨
}
