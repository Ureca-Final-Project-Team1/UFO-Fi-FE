import { Title } from '@/shared';

export const EmptyState = () => {
  return (
    <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
      <Title title="주문 상세" iconVariant="back" />
      <div className="flex items-center justify-center mt-8">
        <div className="text-gray-500">구매 내역을 찾을 수 없습니다.</div>
      </div>
    </div>
  );
};
