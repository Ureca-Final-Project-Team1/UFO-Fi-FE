import { DataSlider } from '@/shared';

type Props = {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxCapacity: number;
};

export function BulkCapacitySlider({ value, setValue, maxCapacity }: Props) {
  return (
    <div className="space-y-4">
      <DataSlider
        value={value}
        onValueChange={setValue}
        showTicks={false}
        showLabels={false}
        minLabel="0GB"
        maxLabel={`${maxCapacity}GB`}
        max={maxCapacity}
      />
    </div>
  );
}
