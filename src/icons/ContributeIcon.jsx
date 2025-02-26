import * as React from 'react';
import { forwardRef } from 'react';

const SvgContributeIcon = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#2D3748"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Z"
    />
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 16h10M16 11v10"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgContributeIcon);
export default ForwardRef;
