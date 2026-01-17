import type { SVGProps } from 'react';
const SvgFilterIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.5 21.5H5M27 21.5h-3.5M21 24a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M10.5 10.5H5M27 10.5H15.5M13 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
    />
  </svg>
);
export default SvgFilterIcon;
