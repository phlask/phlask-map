import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgExport = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    ref={ref}
    {...props}
  >
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.75 7.249 16 2l5.25 5.249M16 16V2.004M22 12h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h3"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgExport);
export default ForwardRef;
