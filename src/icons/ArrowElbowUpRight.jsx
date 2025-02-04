import * as React from 'react';
import { forwardRef } from 'react';

const SvgArrowElbowUpRight = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 17"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m10 8.5 3-3-3-3"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 14.5v-9h9"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgArrowElbowUpRight);
export default ForwardRef;
