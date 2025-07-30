export const getSellErrorMessages = {
  title: (titleInput: string, isValidTitle: boolean) => {
    if (!titleInput) return undefined;
    if (!isValidTitle) return '제목은 1~10자 이내여야 합니다.';
    return undefined;
  },

  price: (isValidPrice: boolean, pricePerGB: string | number) => {
    if (!pricePerGB) return undefined;
    if (!isValidPrice) return '총 판매 가격은 1ZET 이상이어야 합니다.';
    return undefined;
  },

  capacity: (isValidCapacity: boolean) => {
    if (!isValidCapacity) return '판매할 용량을 선택해주세요.';
    return undefined;
  },
};

export const validateSellForm = {
  title: (title: string) => title.length >= 1 && title.length <= 10,
  price: (pricePerGB: string | number, sellCapacity: number) => {
    const price = Number(pricePerGB);
    return price > 0 && price * sellCapacity >= 1;
  },
  capacity: (capacity: number) => capacity > 0,
};
