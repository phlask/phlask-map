import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgDotsThree = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
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
      fill="#2D3748"
      d="M16 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M24 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M8 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgDotsThree);
export default ForwardRef;
