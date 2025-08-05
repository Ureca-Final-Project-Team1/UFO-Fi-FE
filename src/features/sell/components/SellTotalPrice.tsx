type Props = {
  sellCapacity: number;
  totalPrice: number;
  isValidPrice: boolean;
};

export function SellTotalPrice({ sellCapacity, totalPrice, isValidPrice }: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-3 py-2">
      <h3 className=" text-white font-bold text-lg">총 판매 가격</h3>
      <span className="text-white font-bold text-1xl">{sellCapacity}GB</span>
      <span className={`font-bold text-2xl ${isValidPrice ? 'text-yellow-400' : 'text-red-400'}`}>
        {totalPrice.toLocaleString()} ZET
      </span>
    </div>
  );
}
