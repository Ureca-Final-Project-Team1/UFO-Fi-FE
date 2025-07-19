import { IMAGE_PATHS } from '@/constants/images';

export type BankOption = { label: string; value: string; image: string };

export const BANK_OPTIONS: BankOption[] = [
  { label: '카카오뱅크', value: 'kakao', image: IMAGE_PATHS.BANK_KAKAO },
  { label: '우리은행', value: 'woori', image: IMAGE_PATHS.BANK_WOORI },
  { label: '토스뱅크', value: 'toss', image: IMAGE_PATHS.BANK_TOSS },
  { label: '국민은행', value: 'kb', image: IMAGE_PATHS.BANK_KB },
  { label: '새마을금고', value: 'mg', image: IMAGE_PATHS.BANK_MG },
  { label: '신한은행', value: 'sinhan', image: IMAGE_PATHS.BANK_SINHAN },
  { label: '케이뱅크', value: 'k', image: IMAGE_PATHS.BANK_K },
  { label: 'IBK기업은행', value: 'ibk', image: IMAGE_PATHS.BANK_IBK },
  { label: '하나은행', value: 'hana', image: IMAGE_PATHS.BANK_HANA },
];
