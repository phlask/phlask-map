import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgPlusCircle = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 41"
    ref={ref}
    {...props}
  >
    <path
      stroke="#2D3748"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20 28.533c6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.628 5.373 12 12 12Z"
    />
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 16.533h10M20 11.533v10"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgPlusCircle);
export default ForwardRef;
