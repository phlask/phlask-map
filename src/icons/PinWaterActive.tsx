import type { SVGProps } from 'react';
const SvgPinWaterActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 69 70"
    {...props}
  >
    <g filter="url(#PinWaterActive_svg__a)">
      <path
        fill="#5286E9"
        d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563"
      />
    </g>
    <path
      fill="#F7F8FA"
      d="M34.5 7.2a22.827 22.827 0 0 0-6.9 44.562l6.096 12.391a.892.892 0 0 0 1.61 0l6.123-12.391a22.827 22.827 0 0 0-6.928-44.563m4.428 41.4-4.226 8.854a.201.201 0 0 1-.374 0l-4.226-8.826a19.119 19.119 0 1 1 23.517-18.601 19.176 19.176 0 0 1-14.691 18.572"
    />
    <path
      fill="#F7F8FA"
      stroke="#F7F8FA"
      strokeWidth={0.25}
      d="M44.1 32.388c-.295-1.558-.972-2.981-1.645-4.273-2.021-3.943-4.455-7.522-6.85-10.835l-.3-.463c-.41-.562-.9-.86-1.46-.86-.823 0-1.346.66-1.496.86v.033l-.523.73a243 243 0 0 0-2.848 4.107c-1.461 2.186-3.296 5.104-4.642 8.216-.448 1.029-.86 2.054-.897 3.181-.15 2.915 1.047 5.367 3.52 7.29 1.91 1.488 4.344 2.32 6.852 2.32 3.67 0 7.004-1.657 8.91-4.473 1.267-1.857 1.753-3.849 1.379-5.833Zm-2.583 5.202c-1.648 2.451-4.53 3.874-7.714 3.874-2.167 0-4.305-.697-5.95-1.988-2.138-1.656-3.184-3.809-3.068-6.33.033-.926.373-1.82.822-2.783 1.312-3.046 3.11-5.9 4.53-8.052.9-1.357 1.872-2.75 2.844-4.075l.486-.697c0-.033.037-.033.037-.065.075-.099.224-.267.3-.3 0 0 .111.033.298.3l.3.43c2.32 3.247 4.757 6.793 6.738 10.671.635 1.259 1.27 2.583 1.532 3.977.381 1.722-.03 3.41-1.155 5.038Zm-7.037.726c0 .332-.3.598-.677.598-3.405 0-6.137-2.452-6.137-5.436 0-.332.3-.594.673-.594.378 0 .677.262.677.594.037 2.32 2.171 4.21 4.787 4.21.378 0 .677.3.677.628Z"
    />
    <defs>
      <filter
        id="PinWaterActive_svg__a"
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
          result="effect1_dropShadow_568_38816"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_568_38816"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPinWaterActive;
