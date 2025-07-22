import React from 'react';

import { IconProps } from './Icons.types';
import { IconWrapper } from './IconWrapper';

export const UFOIcon: React.FC<IconProps> = (props) => (
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

export const PlanetIcon: React.FC<IconProps> = (props) => (
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
        <path d="m476.3,169.2c37.8-79.8 23.2-119.1 4.4-137.9-17.7-17.6-54-32-126.8-0.6-0.3,0.1-0.6,0.4-1,0.5-29.7-12.9-62.4-20.2-96.9-20.2-135.1,0-245,109.9-245,245 0,34.8 7.4,68 20.6,98-1.2,1.5-2.3,3.1-3.1,5-28.6,69.6-14.3,104.6 2.8,121.7 0,0 0.1,0 0.1,0.1 30.1,34.3 101.3,12.8 137.8-4.5 56-26.5 118.6-72.9 176.4-130.7 57.8-57.7 104.2-120.4 130.7-176.4zm-324.5,270.2c-52,24.6-81.4,22.6-91.5,12.4-8.7-8.7-9.4-27.6-2.5-52.5 2.1,2.9 8.7,17.6 25.9,18.8 5.3,0.4 20.9-1.6 50.7-15.6 47.7-22.6 102.3-63.3 153.6-114.6 51.3-51.3 92-105.9 114.6-153.6 12.9-27.3 15.3-43.9 15.7-50.6 1-16.7-15.9-23.9-18.7-25.9 24.7-6.8 43.8-6.2 52.4,2.4 10.1,10.1 12.2,39.5-12.4,91.6-24.5,51.8-68.1,110.4-122.6,165-54.8,54.5-113.4,98-165.2,122.6z" />
      </g>
    </svg>
  </IconWrapper>
);

export const TrendingIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16v5" />
      <path d="M16 14v7" />
      <path d="M20 10v11" />
      <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
      <path d="M4 18v3" />
      <path d="M8 14v7" />
    </svg>
  </IconWrapper>
);

export const AstronautIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="24" height="24" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.0728 11.997V9.46491C25.0728 8.1821 24.0316 7.13841 22.7517 7.13841H22.0544C21.8812 6.70073 21.6772 6.27494 21.4412 5.86599C21.0189 5.13243 20.4996 4.45444 19.8979 3.85093C18.0659 2.01251 15.629 1 13.0364 1C11.3028 1 9.60126 1.46429 8.11571 2.34262C6.67421 3.1949 5.46949 4.41316 4.63184 5.86552C4.39562 6.27471 4.19157 6.70064 4.01836 7.13846H3.32105C2.04119 7.13846 1 8.1821 1 9.46491V11.997C1 13.2798 2.04119 14.3236 3.32105 14.3236H3.33322V17.8135H1.5233C1.23429 17.8135 1 18.0477 1 18.3368V21.4767C1 21.7657 1.23429 22 1.5233 22H24.5495C24.8385 22 25.0728 21.7657 25.0728 21.4767V18.3368C25.0728 18.0477 24.8385 17.8135 24.5495 17.8135H22.7395V14.3235H22.7517C24.0316 14.3235 25.0728 13.2799 25.0728 11.997Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M21.693 13.8002V10.731C21.693 10.6448 21.6914 10.5586 21.6888 10.4725C21.6883 10.4555 21.6878 10.4384 21.6872 10.4213C21.6808 10.2397 21.669 10.0586 21.6513 9.87833C21.6508 9.87358 21.5862 9.21741 21.2276 7.91852C21.047 7.38826 20.8155 6.87554 20.5345 6.38887C20.1574 5.73387 19.694 5.12885 19.1567 4.58994C17.5224 2.94985 15.3488 2.04669 13.0364 2.04669C9.95615 2.04669 7.08307 3.71044 5.53847 6.38872C5.25735 6.87573 5.02565 7.38873 4.84506 7.91927C4.62558 8.57168 4.48679 9.21723 4.42209 9.87358C4.4039 10.0586 4.39214 10.2397 4.3857 10.4213C4.38156 10.5586 4.37987 10.6448 4.37987 10.731V13.8002H21.693Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M17.7726 6.52385C16.598 6.10417 14.8229 5.604 13.0363 5.604C11.2497 5.604 9.47447 6.10417 8.29994 6.52385C7.1594 6.9313 6.39307 8.02049 6.39307 9.2341V12.9814C6.39307 14.5678 7.68049 15.8583 9.26285 15.8583H16.8097C18.3921 15.8582 19.6794 14.5677 19.6794 12.9814V9.23405C19.6794 8.0204 18.9132 6.93125 17.7726 6.52385Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M8.6521 7.50942C9.74877 7.11767 11.3996 6.6506 13.0363 6.6506C14.6731 6.6506 16.3239 7.11763 17.4205 7.50942C18.1456 7.76848 18.6329 8.46156 18.6329 9.23405V12.9814C18.6329 13.9906 17.815 14.8116 16.8098 14.8116H9.26285C8.25753 14.8117 7.43971 13.9906 7.43971 12.9814V9.2341C7.43971 8.46156 7.92691 7.76848 8.6521 7.50942Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="5.18663" cy="21.4765" r="0.3" fill="currentColor" />
    </svg>
  </IconWrapper>
);

export const SatelliteIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon line-color"
      fill="none"
      width={props.size ?? 24}
      height={props.size ?? 24}
    >
      <line
        x1="15.32"
        y1="7.68"
        x2="19"
        y2="4"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      />
      <line
        x1="19.05"
        y1="4"
        x2="18.95"
        y2="4"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      />
      <line
        x1="6"
        y1="21"
        x2="9.4"
        y2="12.25"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      />
      <line
        x1="13.58"
        y1="14.79"
        x2="16"
        y2="21"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      />
      <line
        x1="4"
        y1="21"
        x2="18"
        y2="21"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
      />
      <path
        d="M11,3.31a1.06,1.06,0,0,0-1.59.11A7.33,7.33,0,0,0,19.58,13.64a1.06,1.06,0,0,0,.11-1.59Z"
        style={{
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          fill: 'none',
        }}
      />
    </svg>
  </IconWrapper>
);

export const BoxIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.4474 12.8995H17.5M14.9737 10.3493V15.4498M16.6579 7.79892V6.09875C16.6576 5.80061 16.5796 5.50779 16.4318 5.24966C16.284 4.99153 16.0716 4.77718 15.8158 4.62811L9.92105 1.22778C9.66502 1.07856 9.37459 1 9.07895 1C8.78331 1 8.49287 1.07856 8.23684 1.22778L2.34211 4.62811C2.08633 4.77718 1.87388 4.99153 1.72607 5.24966C1.57827 5.50779 1.5003 5.80061 1.5 6.09875V12.8994C1.5003 13.1976 1.57827 13.4904 1.72607 13.7485C1.87388 14.0066 2.08633 14.221 2.34211 14.3701L8.23684 17.7704C8.49287 17.9196 8.78331 17.9982 9.07895 17.9982C9.37459 17.9982 9.66502 17.9196 9.92105 17.7704L11.6053 16.8013M5.28947 2.92804L12.8684 7.30597M1.74424 5.24875L9.07898 9.49917M9.07898 9.49917L16.4137 5.24875M9.07898 9.49917L9.07895 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const RotateIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 1.66699V6.66699H12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 10.8335C17.3231 12.5051 16.5897 14.0688 15.4176 15.2737C14.2454 16.4785 12.7025 17.2547 11.0364 17.4777C9.37034 17.7006 7.67764 17.3574 6.22997 16.5031C4.78229 15.6488 3.66358 14.333 3.05334 12.7667C2.44311 11.2004 2.37673 9.47454 2.86486 7.86602C3.35299 6.2575 4.36734 4.8596 5.74512 3.89663C7.1229 2.93365 8.78424 2.46144 10.4625 2.55577C12.1408 2.6501 13.7388 3.30549 15 4.41679L17.5 6.66679"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const GraphIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.90381 1.90381C-1.54972e-07 3.80761 0 6.87174 0 13C0 19.1282 -1.54972e-07 22.1924 1.90381 24.0961C3.80761 26 6.87174 26 13 26C19.1282 26 22.1924 26 24.0961 24.0961C26 22.1924 26 19.1282 26 13C26 6.87174 26 3.80761 24.0961 1.90381C22.1924 -1.54972e-07 19.1282 0 13 0C6.87174 0 3.80761 -1.54972e-07 1.90381 1.90381ZM15.275 10.4C15.275 10.9385 15.7115 11.375 16.25 11.375H17.1461L14.5298 13.9914C14.4028 14.1183 14.1972 14.1183 14.0702 13.9914L12.0086 11.9298C11.1202 11.0414 9.67977 11.0414 8.79133 11.9298L5.81057 14.9106C5.42981 15.2914 5.42981 15.9086 5.81057 16.2894C6.19133 16.6702 6.80867 16.6702 7.18943 16.2894L10.1702 13.3086C10.2971 13.1817 10.5028 13.1817 10.6298 13.3086L12.6914 15.3702C13.5798 16.2586 15.0202 16.2586 15.9086 15.3702L18.525 12.7539V13.65C18.525 14.1885 18.9615 14.625 19.5 14.625C20.0385 14.625 20.475 14.1885 20.475 13.65V10.4C20.475 9.86153 20.0385 9.425 19.5 9.425H16.25C15.7115 9.425 15.275 9.86153 15.275 10.4Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

export const CircleMinusIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1098_1039)">
        <path
          d="M6.6665 9.99935H13.3332M18.3332 9.99935C18.3332 14.6017 14.6022 18.3327 9.99984 18.3327C5.39746 18.3327 1.6665 14.6017 1.6665 9.99935C1.6665 5.39698 5.39746 1.66602 9.99984 1.66602C14.6022 1.66602 18.3332 5.39698 18.3332 9.99935Z"
          stroke="#FB2C36"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1098_1039">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </IconWrapper>
);

export const VectorIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 9C17 10.5822 16.5308 12.129 15.6518 13.4446C14.7727 14.7602 13.5233 15.7855 12.0615 16.391C10.5997 16.9965 8.99113 17.155 7.43928 16.8463C5.88743 16.5376 4.46197 15.7757 3.34315 14.6568C2.22433 13.538 1.4624 12.1126 1.15372 10.5607C0.84504 9.00887 1.00347 7.40034 1.60897 5.93853C2.21447 4.47672 3.23985 3.22729 4.55544 2.34824C5.87103 1.46919 7.41775 1 9 1C11.24 1 13.3822 1.88889 14.9911 3.43555L17 5.44444M17 5.44444L17 1M17 5.44444H12.5556"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);
