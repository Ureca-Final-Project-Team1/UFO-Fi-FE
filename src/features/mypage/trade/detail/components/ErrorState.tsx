import { Title } from '@/shared';

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
      <Title title="주문 상세" iconVariant="back" />
      <div className="flex items-center justify-center mt-8">
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );
};
