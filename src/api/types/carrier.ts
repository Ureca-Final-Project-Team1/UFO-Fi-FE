export enum Carrier {
  SKT = 'SKT',
  KT = 'KT',
  LGU = 'LGU',
}

// 통신사 관련 유틸리티
export const CARRIER_DISPLAY_NAMES = {
  [Carrier.SKT]: 'SKT',
  [Carrier.KT]: 'KT',
  [Carrier.LGU]: 'LGU+',
} as const;

export const CARRIER_FULL_NAMES = {
  [Carrier.SKT]: 'SKT',
  [Carrier.KT]: 'KT',
  [Carrier.LGU]: 'LG유플러스',
} as const;

// 유틸리티 함수들
export const getCarrierDisplayName = (carrier: Carrier): string => {
  return CARRIER_DISPLAY_NAMES[carrier];
};

export const getCarrierFullName = (carrier: Carrier): string => {
  return CARRIER_FULL_NAMES[carrier];
};

export const getAllCarriers = (): Carrier[] => {
  return Object.values(Carrier);
};

export const isValidCarrier = (value: string): value is Carrier => {
  return Object.values(Carrier).includes(value as Carrier);
};
