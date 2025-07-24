'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { PropsWithChildren } from 'react';

import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';

type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

type PropType = PropsWithChildren<{
  options?: EmblaOptions;
  className?: string;
}>;

const EmblaCarousel: React.FC<PropType> = ({ children, options, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className={`embla__container ${className}`}>{children}</div>
      </div>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </section>
  );
};

export default EmblaCarousel;
