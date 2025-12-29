import type { SVGProps } from 'react';
const SvgResourceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
    />
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M26 13c0 9-10 16-10 16S6 22 6 13a10 10 0 1 1 20 0"
    />
  </svg>
);
export default SvgResourceIcon;
