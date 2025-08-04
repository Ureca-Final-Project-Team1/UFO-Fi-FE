import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock useSellData for Storybook
const MockUseSellData = ({
  initialValue = [5],
  initialTitle = '',
  initialPrice = 120,
  maxCapacity = 10,
  isSubmitting = false,
}: {
  initialValue?: number[];
  initialTitle?: string;
  initialPrice?: number;
  maxCapacity?: number;
  isSubmitting?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);
  const [titleInput, setTitleInput] = useState(initialTitle);
  const [pricePerGB, setPricePerGB] = useState(initialPrice);

  const sellCapacity = Array.isArray(value) ? value[0] : value;
  const totalPrice = sellCapacity * pricePerGB;

  // 유효성 검증 함수들
  const validateTitle = (title: string): boolean => {
    return title.trim().length >= 1 && title.trim().length <= 15;
  };

  const validateCapacity = (capacity: number): boolean => {
    return capacity >= 1;
  };

  const validatePricePerGB = (price: number): boolean => {
    return price >= 0;
  };

  const validateTotalPrice = (total: number): boolean => {
    return total >= 1;
  };

  const handleSubmit = async () => {
    // 제목 검증 (1~15자)
    if (!validateTitle(titleInput)) {
      console.log('제목은 1~15자 이내로 입력해주세요.');
      return;
    }

    // 용량 검증 (1GB 이상)
    if (!validateCapacity(sellCapacity)) {
      console.log('판매 용량은 1GB 이상이어야 합니다.');
      return;
    }

    // 가격 검증 (1ZET 이상)
    if (!validateTotalPrice(totalPrice)) {
      console.log('총 판매 가격은 1ZET 이상이어야 합니다.');
      return;
    }

    console.log('판매 등록 완료:', {
      title: titleInput.trim(),
      zetPerUnit: pricePerGB,
      sellDataAmount: sellCapacity,
    });
  };

  const handlePriceChange = (e: { target: { value: unknown } }) => {
    const newPrice = Number(e.target.value);
    if (newPrice >= 0) {
      setPricePerGB(newPrice);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    // 15자 제한
    if (newTitle.length <= 15) {
      setTitleInput(newTitle);
    }
  };

  const isValidTitle = validateTitle(titleInput);
  const isValidPrice = validatePricePerGB(pricePerGB) && validateTotalPrice(totalPrice);
  const isValidCapacity = validateCapacity(sellCapacity);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">데이터 판매 폼</h2>

      {/* 제목 입력 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">제목 (1-15자)</label>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="판매 제목을 입력하세요"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            titleInput && !isValidTitle ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {titleInput && !isValidTitle && (
          <p className="text-red-500 text-xs mt-1">제목은 1~15자 이내로 입력해주세요.</p>
        )}
      </div>

      {/* 용량 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          판매 용량 (1-{maxCapacity}GB)
        </label>
        <input
          type="range"
          min="1"
          max={maxCapacity}
          value={sellCapacity}
          onChange={(e) => setValue([Number(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>1GB</span>
          <span className="font-bold">{sellCapacity}GB</span>
          <span>{maxCapacity}GB</span>
        </div>
      </div>

      {/* 가격 설정 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">GB당 가격 (ZET)</label>
        <input
          type="number"
          value={pricePerGB}
          onChange={handlePriceChange}
          min="0"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !isValidPrice ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      {/* 총 가격 표시 */}
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <div className="text-sm text-gray-600">총 판매 가격</div>
        <div className="text-xl font-bold text-blue-600">{totalPrice} ZET</div>
      </div>

      {/* 유효성 검증 상태 */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
        <div className={`${isValidTitle ? 'text-green-600' : 'text-red-600'}`}>
          제목 유효성: {isValidTitle ? '✓' : '✗'}
        </div>
        <div className={`${isValidCapacity ? 'text-green-600' : 'text-red-600'}`}>
          용량 유효성: {isValidCapacity ? '✓' : '✗'}
        </div>
        <div className={`${isValidPrice ? 'text-green-600' : 'text-red-600'}`}>
          가격 유효성: {isValidPrice ? '✓' : '✗'}
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isValidTitle || !isValidCapacity || !isValidPrice || isSubmitting}
        className={`w-full p-3 rounded-lg font-medium transition-colors ${
          !isValidTitle || !isValidCapacity || !isValidPrice || isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? '등록 중...' : '판매 등록'}
      </button>
    </div>
  );
};

const meta: Meta<typeof MockUseSellData> = {
  title: 'Hooks/useSellData',
  component: MockUseSellData,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: { type: 'object' },
      description: '초기 용량 값',
    },
    initialTitle: {
      control: { type: 'text' },
      description: '초기 제목',
    },
    initialPrice: {
      control: { type: 'number' },
      description: '초기 GB당 가격',
    },
    maxCapacity: {
      control: { type: 'number' },
      description: '최대 용량',
    },
    isSubmitting: {
      control: { type: 'boolean' },
      description: '제출 중 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: [5],
    initialTitle: '',
    initialPrice: 120,
    maxCapacity: 10,
    isSubmitting: false,
  },
};

export const WithTitle: Story = {
  args: {
    initialValue: [5],
    initialTitle: '데이터 판매',
    initialPrice: 120,
    maxCapacity: 10,
    isSubmitting: false,
  },
};

export const HighCapacity: Story = {
  args: {
    initialValue: [8],
    initialTitle: '대용량 데이터',
    initialPrice: 150,
    maxCapacity: 10,
    isSubmitting: false,
  },
};

export const LowPrice: Story = {
  args: {
    initialValue: [3],
    initialTitle: '저가 데이터',
    initialPrice: 50,
    maxCapacity: 10,
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    initialValue: [5],
    initialTitle: '판매 등록 중',
    initialPrice: 120,
    maxCapacity: 10,
    isSubmitting: true,
  },
};

export const InvalidTitle: Story = {
  args: {
    initialValue: [5],
    initialTitle: '매우매우매우매우매우긴제목입니다',
    initialPrice: 120,
    maxCapacity: 10,
    isSubmitting: false,
  },
};

export const InvalidPrice: Story = {
  args: {
    initialValue: [1],
    initialTitle: '저가 판매',
    initialPrice: 0,
    maxCapacity: 10,
    isSubmitting: false,
  },
};
