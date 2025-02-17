import * as React from 'react';
import { forwardRef } from 'react';

const SvgCloseIcon = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 36"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#2D3748"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m26 6.5-20 20M6 6.5l20 20"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCloseIcon);
export default ForwardRef;
