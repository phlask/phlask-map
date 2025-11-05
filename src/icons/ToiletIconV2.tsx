import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgToiletIconV2 = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 62 63"
    ref={ref}
    {...props}
  >
    <rect
      width={61}
      height={61}
      x={0.5}
      y={0.7}
      fill="#9E9E9E"
      stroke="#E0E0E0"
      rx={9.5}
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M27.902 15.39h-9.756v17.074h9.756zM47.902 32.463h-20v-6.341h16.854a3.15 3.15 0 0 1 3.146 3.146zM35.22 44.659H22.535V51H35.22zM30.805 11H15v4.39h15.805z"
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M36.102 44.659H22.078a3.933 3.933 0 0 1-3.932-3.932v-7.61c0-.36.293-.654.654-.654h26.005c.36 0 .654.293.654.654v2.18c.004 5.171-4.186 9.362-9.357 9.362"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgToiletIconV2);
export default ForwardRef;
