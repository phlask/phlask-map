import * as React from 'react';
import { forwardRef } from 'react';

const SvgPinBathroomsDefault = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 69 70"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g filter="url(#PinBathroomsDefault_svg__a)">
      <path
        fill="#fff"
        d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563"
      />
    </g>
    <path
      fill="#9E9E9E"
      d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563m4.428 41.4-4.226 8.854a.201.201 0 0 1-.374 0l-4.226-8.826a19.119 19.119 0 1 1 23.517-18.601 19.176 19.176 0 0 1-14.691 18.572"
    />
    <path
      fill="#2D3748"
      d="M44.535 26.563a2.7 2.7 0 0 0-1.901-.788h-9.938v-5.273h1.13a.713.713 0 0 0 .727-.728v-2.792a.71.71 0 0 0-.728-.713h-9.997a.67.67 0 0 0-.505.223.71.71 0 0 0-.208.505v2.822a.73.73 0 0 0 .713.728h1.278v10.07q-.01.105 0 .209-.01.104 0 .208v4.813a3.18 3.18 0 0 0 2.777 3.134v3.327a.71.71 0 0 0 .208.505c.14.136.325.216.52.223h8.022a.715.715 0 0 0 .712-.728v-3.342a6.67 6.67 0 0 0 6.477-6.67v-1.054h.817a.715.715 0 0 0 .713-.728v-2.035a2.67 2.67 0 0 0-.817-1.916m-20.038-8.809h8.54v1.322h-8.54zm6.714 2.748v9.343h-4.709v-9.343zM29.369 41.58v-2.57h6.58v2.555zm12.997-10.279v.995a5.183 5.183 0 0 1-5.154 5.214h-8.913a1.86 1.86 0 0 1-1.247-.505 1.7 1.7 0 0 1-.52-1.248v-4.456h15.834m.312-1.604h-9.952v-2.421h9.923a1.16 1.16 0 0 1 .906.371 1.25 1.25 0 0 1 .37.891v1.159z"
    />
    <defs>
      <filter
        id="PinBathroomsDefault_svg__a"
        width={49.529}
        height={61.463}
        x={9.95}
        y={6.399}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={0.2} dy={1.2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.62 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_568_38826"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_568_38826"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPinBathroomsDefault);
export default ForwardRef;
