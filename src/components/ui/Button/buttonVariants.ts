// buttonVariants.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-[#B284F7] text-[#3B2A64] font-bold text-[15px] hover:bg-[#A16CF0]',
        secondary: 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200',
        destructive: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
        link: 'text-blue-600 underline-offset-4 hover:underline',
        'exploration-button':
          'bg-gradient-to-r from-[#266DFD] to-[#F71CD7] border-2 border-[#67E9FF] text-white font-semibold text-[16px] leading-[24px] hover:opacity-90',
        'cancel-button':
          'rounded-[12px] border border-[#EAEAF2] bg-white text-[#35363F] text-center font-semibold text-[16px] leading-[24px] hover:bg-gray-50',
        'number-badge':
          'flex py-3 px-0 items-center flex-shrink-0 rounded-lg border-2 border-[#4261D0] bg-[#001579] text-[#31D7F3] text-center font-semibold text-[18px] leading-[26px] hover:bg-[#002080]',
        'action-button': 'bg-pink-500 text-white hover:bg-pink-600',
        'next-button': 'bg-[#B284F7] text-white hover:bg-[#7A6BC0]',
        'project-button': 'rounded-[5px] bg-[#DED1F1] text-black',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        'full-width': 'h-[54px] w-[350px] rounded-[10px] px-8 font-bold text-[20px] leading-[28px]',
        compact: 'h-8 px-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
