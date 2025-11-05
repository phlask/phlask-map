import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgCaretDown = (
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
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M26 12 16 22 6 12"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCaretDown);
export default ForwardRef;
