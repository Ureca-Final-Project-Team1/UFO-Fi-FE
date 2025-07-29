import type { MobileDataType } from '@/api/types/mobileData';

/**
 * 모바일 데이터 타입을 표시용 문자열로 변환
 * @param mobileDataType - 모바일 데이터 타입
 * @returns 표시용 문자열 ('LTE' -> 'LTE', '_5G' -> '5G')
 */
export const getMobileDataTypeDisplay = (mobileDataType: MobileDataType): string => {
  return mobileDataType === '_5G' ? '5G' : mobileDataType;
};

/**
 * 표시용 문자열을 모바일 데이터 타입으로 변환
 * @param displayString - 표시용 문자열 ('LTE' -> 'LTE', '5G' -> '_5G')
 * @returns 모바일 데이터 타입
 */
export const getMobileDataTypeFromDisplay = (displayString: string): MobileDataType => {
  return displayString === '5G' ? '_5G' : 'LTE';
};
