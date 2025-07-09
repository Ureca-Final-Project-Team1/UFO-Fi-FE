export interface DataSliderProps {
  value: number[];
  onValueChange: (val: number[]) => void;
  showTicks?: boolean;
  showLabels?: boolean;
}
