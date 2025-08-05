import { DataSlider } from '@/shared';

type Props = {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxCapacity: number;
  errorMessage?: string;
  showTicks?: boolean;
  showLabels?: boolean;
};

export function SellCapacitySlider({
  value,
  setValue,
  maxCapacity,
  errorMessage,
  showTicks = true,
  showLabels = true,
}: Props) {
  return (
    <div className="space-y-1 items-center">
      <div className="flex flex-col items-start justify-between">
        <h3 className="text-white font-bold text-lg">판매 용량 설정</h3>
      </div>
      <div className="w-full flex justify-center">
        <div
          className="text-red-400 text-sm font-medium text-center"
          style={{
            minHeight: '10px',
            height: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {errorMessage || ''}
        </div>
      </div>
      <DataSlider
        value={value}
        onValueChange={setValue}
        showTicks={showTicks}
        showLabels={showLabels}
        minLabel="0GB"
        maxLabel={`${maxCapacity}GB`}
        max={maxCapacity}
      />
      <div className="text-cyan-400 text-sm px-4">남은 최대 판매 가능 용량 : {maxCapacity}GB</div>
    </div>
  );
}
