'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { PropsWithChildren } from 'react';

import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';

type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

type PropType = PropsWithChildren<{
  options?: EmblaOptions;
  className?: string;
  isDesktop?: boolean;
}>;

const EmblaCarousel: React.FC<PropType> = ({ children, options, className, isDesktop = true }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla flex gap-2 w-full">
      {isDesktop && <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />}
      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        <div className={`embla__container flex w-full ${className}`}>{children}</div>
      </div>
      {isDesktop && <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />}
    </section>
  );
};

export default EmblaCarousel;
