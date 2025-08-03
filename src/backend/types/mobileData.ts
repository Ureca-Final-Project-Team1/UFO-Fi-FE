/* LTE와 5G 네트워크 타입을 나타냅니다. */

export const MOBILE_DATA_TYPES = ['LTE', '_5G'] as const;

export type MobileDataType = (typeof MOBILE_DATA_TYPES)[number];
