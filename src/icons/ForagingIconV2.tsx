import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgForagingIconV2 = (
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
      y={1.3}
      fill="#5DA694"
      stroke="#E0E0E0"
      rx={9.5}
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.778 52h15.896"
    />
    <path
      stroke="#FAFAFA"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M47.229 28.814c-.608-2.06-2.333-3.548-4.536-4.207.284-1.039.306-2.123-.006-3.173-.908-3.083-4.314-4.883-8.084-4.536-.256-1.403-.92-2.657-2.01-3.566-2.907-2.418-7.704-1.453-10.713 2.158a10.3 10.3 0 0 0-1.652 2.765c-2.424.987-4.156 2.929-4.394 5.313-.125 1.26.187 2.476.829 3.566-1.607.976-2.663 2.589-2.663 4.41 0 2.982 2.793 5.394 6.245 5.394.505 0 .994-.056 1.465-.153.653 1.101 1.976 1.857 3.508 1.857a4.35 4.35 0 0 0 2.39-.699c.835.437 1.874.699 3.004.699 1.51 0 2.861-.466 3.77-1.193 1.879.863 4.252 1.05 6.625.352 4.508-1.34 7.295-5.36 6.222-8.987Z"
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M31.026 22.745v28.67M23.078 26.152s.568 7.38 7.948 6.245M36.703 22.745s-.363 4.746-5.11 4.014"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgForagingIconV2);
export default ForwardRef;
