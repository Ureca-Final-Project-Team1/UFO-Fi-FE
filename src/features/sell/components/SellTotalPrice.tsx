type Props = {
  sellCapacity: number;
  totalPrice: number;
  isValidPrice: boolean;
};

export function SellTotalPrice({ sellCapacity, totalPrice, isValidPrice }: Props) {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-white w-full text-left font-bold text-lg">총 판매 금액</h3>
      <div className="bg-white/10 rounded-xl px-6 py-4 flex items-center justify-center gap-3">
        <span className="text-white text-xl font-bold">{sellCapacity}GB</span>
        <span className={`text-2xl font-bold ${isValidPrice ? 'text-yellow-400' : 'text-red-400'}`}>
          {totalPrice.toLocaleString()} ZET
        </span>
      </div>
    </div>
  );
}
