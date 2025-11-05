import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgJoinDesignIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 31"
    ref={ref}
    {...props}
  >
    <path
      stroke="#2D3848"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.622}
      d="m22.047 4.288 4.174 4.175L7.517 27.167a.22.22 0 0 1-.321 0l-3.853-3.853a.22.22 0 0 1 0-.321zM27.424 2.158l.928.929a2.31 2.31 0 0 1 0 3.257l-2.121 2.121-4.174-4.174 2.121-2.122a2.31 2.31 0 0 1 3.257 0zM9.635 14.102l-7.93-7.93 4.93-4.93 7.395 7.395-2.027 2.01M18.864 19.26l2.886-2.887 7.38 7.363-4.93 4.93-7.931-7.93M7.121 5.766l2.011-2.011M8.679 9.058l2.887-2.886M22.122 20.768l2.011-2.027M23.858 24.24l2.887-2.888"
    />
    <path
      stroke="#2D3848"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.622}
      d="m7.43 27.32-6.261 2.027 2.011-6.212"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgJoinDesignIcon);
export default ForwardRef;
