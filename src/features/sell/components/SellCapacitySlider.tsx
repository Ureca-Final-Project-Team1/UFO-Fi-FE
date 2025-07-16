import { DataSlider } from '@/shared';

type Props = {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxCapacity: number;
};

export function SellCapacitySlider({ value, setValue, maxCapacity }: Props) {
  return (
    <div className="space-y-4 items-center">
      <h3 className="text-white font-bold text-lg">판매 용량 설정</h3>
      <DataSlider
        value={value}
        onValueChange={setValue}
        showTicks
        showLabels
        minLabel="0GB"
        maxLabel={`${maxCapacity}GB`}
        max={maxCapacity}
      />
      <div className="text-white/80 text-sm pt-4">남은 최대 판매 가능 용량 : {maxCapacity}GB</div>
    </div>
  );
}
