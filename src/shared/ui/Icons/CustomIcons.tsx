import React from 'react';

import { CustomIconProps } from './Icons.types';
import { IconWrapper } from './IconWrapper';

export const UFOIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="16" height="16" id="icon-bound" fill="none" />
      <path
        d="M6,13L3,15L3.889,12.333L0,10L16,10L12.111,12.333L13,15L10,13L6,13ZM16,9L0,9L0,8L3,6C3,3.24 5.24,1 8,1C10.76,1 13,3.24 13,6L16,8L16,9Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

export const PlanetIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      width="24"
      height="24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g fill="currentColor">
        <path d="m497.7,216.2c-29.3,51.9-72,107.1-123.2,158.3-51.2,51.2-106.3,93.9-158.3,123.2 13,2.1 26.2,3.3 39.8,3.3 135.1,0 245-109.9 245-245 0-13.5-1.2-26.8-3.3-39.8z" />
        <path d="m476.3,169.2c37.8-79.8 23.2-119.1 4.4-137.9-17.7-17.6-54-32-126.8-0.6-0.3,0.1-0.6,0.4-1,0.5-29.7-12.9-62.4-20.2-96.9-20.2-135.1,0-245,109.9-245,245 0,34.8 7.4,68 20.6,98-1.2,1.5-2.3,3.1-3.1,5-28.6,69.6-14.3,104.6 2.8,121.7 0,0 0.1,0 0.1,0.1 30.1,34.3 101.3,12.8 137.8-4.5 56-26.5 118.6-72.9 176.4-130.7 57.8-57.7 104.2-120.4 130.7-176.4zm-324.5,270.2c-52,24.6-81.4,22.6-91.5,12.4-8.7-8.7-9.4-27.6-2.5-52.5 2.1,2.9 8.7,17.6 25.9,18.8 5.3,0.4 20.9-1.6 50.7-15.6 47.7-22.6 102.3-63.3 153.6-114.6 51.3-51.3 92-105.9 114.6-153.6 12.9-27.3 15.3-43.9 15.7-49.4 0.4-5.3-1.6-20.9-15.6-50.7-22.6-47.7-63.3-102.3-114.6-153.6z" />
      </g>
    </svg>
  </IconWrapper>
);

export const TrendingIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 7L13.5 15.5L8.5 10.5L2 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7H22V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const AstronautIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrapper>
);

export const SatelliteIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10a7.31 7.31 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 15 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 13a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 13A10 10 0 0 0 11 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const BoxIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.3 7l8.7 5 8.7-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const RotateIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 9C17 10.5822 16.5308 12.129 15.6518 13.4446C14.7727 14.7602 13.5233 15.7855 12.0615 16.391C10.5997 16.9965 8.99113 17.155 7.43928 16.8463C5.88743 16.5376 4.46197 15.7757 3.34315 14.6568C2.22433 13.538 1.4624 12.1126 1.15372 10.5607C0.84504 9.00887 1.00347 7.40034 1.60897 5.93853C2.21447 4.47672 3.23985 3.22729 4.55544 2.34824C5.87103 1.46919 7.41775 1 9 1C11.24 1 13.3822 1.88889 14.9911 3.43555L17 5.44444M17 5.44444L17 1M17 5.44444H12.5556"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const GraphIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9l6-6 4 4 2-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const CircleMinusIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrapper>
);

export const ReturnIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 14L4 9l5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 20v-7a4 4 0 0 0-4-4H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const EmblaPrevIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg className="embla__button__svg" viewBox="0 0 532 532">
      <path
        fill="currentColor"
        d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
      />
    </svg>
  </IconWrapper>
);

export const EmblaNextIcon: React.FC<CustomIconProps> = (props) => (
  <IconWrapper {...props}>
    <svg className="embla__button__svg" viewBox="0 0 532 532">
      <path
        fill="currentColor"
        d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
      />
    </svg>
  </IconWrapper>
);
