import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { sellAPI } from '@/api';

export const useSellData = () => {
  const [value, setValue] = useState([5]);
  const [titleInput, setTitleInput] = useState('');
  const [pricePerGB, setPricePerGB] = useState(120);

  const maxCapacity = 10;
  const averagePrice = 100;
  const sellCapacity = Array.isArray(value) ? value[0] : value;
  const totalPrice = sellCapacity * pricePerGB;

  // 유효성 검증 함수들
  const validateTitle = (title: string): boolean => {
    return title.trim().length >= 1 && title.trim().length <= 15;
  };

  const validatePrice = (price: number): boolean => {
    return typeof price === 'number' && price >= 1 && price <= 10000;
  };

  const validateCapacity = (capacity: number): boolean => {
    return capacity >= 1;
  };

  const sellMutation = useMutation({
    mutationFn: async (data: Parameters<typeof sellAPI.createPost>[0]) => {
      return await sellAPI.createPost(data);
    },
    onSuccess: () => {
      toast.success('판매 등록이 완료되었습니다!');
      setTitleInput('');
      setValue([5]);
      setPricePerGB(120);
    },
  });

  const handleSubmit = async () => {
    // 제목 검증 (1~15자)
    if (!validateTitle(titleInput)) {
      toast.error('제목은 1~15자 이내로 입력해주세요.');
      return;
    }

    // 용량 검증 (1GB 이상)
    if (!validateCapacity(sellCapacity)) {
      toast.error('판매 용량은 1GB 이상이어야 합니다.');
      return;
    }

    // 가격 검증 (1ZET 이상)
    if (!validatePrice(totalPrice)) {
      toast.error('총 판매 가격은 1ZET 이상이어야 합니다.');
      return;
    }

    const requestData = {
      title: titleInput.trim(),
      zetPerUnit: pricePerGB,
      sellDataAmount: sellCapacity,
    };

    await sellMutation.mutateAsync(requestData);
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

  return {
    value,
    setValue,
    titleInput,
    setTitleInput: handleTitleChange,
    pricePerGB,
    setPricePerGB,

    // 계산된 값들
    maxCapacity,
    averagePrice,
    sellCapacity,
    totalPrice,

    // 함수들
    handleSubmit,
    handlePriceChange,

    // 유효성 검증 상태
    isValidTitle: validateTitle(titleInput),
    isValidPrice: validatePrice(totalPrice),
    isValidCapacity: validateCapacity(sellCapacity),

    // 로딩 상태
    isSubmitting: sellMutation.isPending,
  };
};
