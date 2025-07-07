import { Slot } from '@radix-ui/react-slot';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { BadgeProps } from './Badge.types';
import { badgeVariants } from './badgeVariants';

function Badge({ className, variant, state, asChild = false, children, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  const appliedClass = state
    ? badgeVariants({ state })
    : badgeVariants({ variant: variant || 'default' });

  return (
    <Comp data-slot="badge" className={cn(appliedClass, className, 'caption-12-bold')} {...props}>
      {state ? (
        <>
          <Image src={`/icons/badge/${state}.svg`} alt={state} width={12} height={12} />
          <span>
            {
              {
                selling: '판매중',
                sold: '판매완료',
                timeout: '기간만료',
                reported: '블라인드',
              }[state]
            }
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Badge };
