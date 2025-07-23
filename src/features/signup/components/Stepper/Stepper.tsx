'use client';

import { cn } from '@/lib/utils';
import { Icon } from '@/shared';

import { StepperProps } from './Stepper.types';

export function Stepper({ className, step, content, textColor = 'text-white' }: StepperProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center relative">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center caption-12-bold',
              step === 2
                ? 'bg-(--color-stepper-prev) text-(--color-stepper-check)'
                : 'bg-(--color-stepper-chosen)',
            )}
          >
            {step === 2 ? <Icon name="Check" className="w-4 h-4" /> : '1'}
          </div>
          {step === 1 && (
            <span className={`absolute top-10 caption-12-medium ${textColor} whitespace-nowrap`}>
              {content}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-(--color-stepper-chosen)" />
          ))}
        </div>

        <div className="flex flex-col items-center relative">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center caption-12-bold',
              step === 2
                ? 'bg-(--color-stepper-check) text-white'
                : 'bg-white text-gray-300 border border-gray-300',
            )}
          >
            2
          </div>
          {step === 2 && (
            <span className={`absolute top-10 caption-12-medium ${textColor} whitespace-nowrap`}>
              {content}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
