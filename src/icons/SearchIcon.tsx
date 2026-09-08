import type { SVGProps } from 'react';
const SvgSearchIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.5 25C20.299 25 25 20.299 25 14.5S20.299 4 14.5 4 4 8.701 4 14.5 8.701 25 14.5 25M21.924 21.925 28 28"
    />
  </svg>
);
export default SvgSearchIcon;
