import * as React from 'react';
import { forwardRef } from 'react';

const SvgPinForagingActive = ({ title, titleId, ...props }, ref) => (
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
    <g filter="url(#PinForagingActive_svg__a)">
      <path
        fill="#5DA694"
        d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563"
      />
    </g>
    <path
      fill="#F7F8FA"
      d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563m4.428 41.4-4.226 8.854a.201.201 0 0 1-.374 0l-4.226-8.826a19.119 19.119 0 1 1 23.517-18.601 19.176 19.176 0 0 1-14.691 18.572"
    />
    <path
      fill="#F7F8FA"
      d="M42.737 25.107a4.46 4.46 0 0 0-.148-1.872 5.48 5.48 0 0 0-5.54-3.624 4.67 4.67 0 0 0-1.486-2.199c-2.273-1.886-5.986-1.203-8.274 1.516a7.1 7.1 0 0 0-1.114 1.767 5.16 5.16 0 0 0-3.15 4.174c-.043.75.094 1.499.402 2.184a4.17 4.17 0 0 0-1.634 3.223 4.752 4.752 0 0 0 5.615 4.338 3.79 3.79 0 0 0 4.337.817c.477.18.977.29 1.486.326v5.244H29.77a.743.743 0 0 0-.743.743.76.76 0 0 0 .743.742h8.645a.743.743 0 0 0 0-1.485h-3.64v-5.303a5 5 0 0 0 1.605-.594 7.32 7.32 0 0 0 4.59.104c3.431-1.01 5.54-4.145 4.709-6.982a4.95 4.95 0 0 0-2.942-3.12m-2.183 8.675a5.7 5.7 0 0 1-3.951-.208l-.416-.178-.372.282a2.7 2.7 0 0 1-1.04.475V27.84h.283a3.4 3.4 0 0 0 2.139-.698 4.2 4.2 0 0 0 1.396-2.748.74.74 0 0 0-.668-.802.757.757 0 0 0-.802.683 2.7 2.7 0 0 1-.862 1.708 2 2 0 0 1-1.486.342v-1.99a.743.743 0 1 0-1.485 0v5.822a3.5 3.5 0 0 1-2.436-.653 4.74 4.74 0 0 1-1.485-2.971.73.73 0 0 0-1.068-.605.74.74 0 0 0-.403.724 5.94 5.94 0 0 0 2.05 4.01 4.8 4.8 0 0 0 3.075 1.01h.267v2.615a3.3 3.3 0 0 1-1.233-.327l-.386-.178-.357.252a2.23 2.23 0 0 1-2.97-.55l-.268-.445-.52.104a3.326 3.326 0 0 1-4.307-2.807 2.79 2.79 0 0 1 1.485-2.347l.624-.372-.446-.698a3.22 3.22 0 0 1-.46-1.96 3.79 3.79 0 0 1 2.51-2.971l.342-.09.119-.282a6.1 6.1 0 0 1 .995-1.663c1.768-2.125 4.545-2.734 6.194-1.367a3.3 3.3 0 0 1 1.1 1.96l.118.67h.683a4.174 4.174 0 0 1 4.739 2.45 3.1 3.1 0 0 1 0 1.723l-.193.713.698.208a3.6 3.6 0 0 1 2.466 2.332c.624 2.05-1.025 4.353-3.67 5.14"
    />
    <defs>
      <filter
        id="PinForagingActive_svg__a"
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
          result="effect1_dropShadow_568_38824"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_568_38824"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPinForagingActive);
export default ForwardRef;
