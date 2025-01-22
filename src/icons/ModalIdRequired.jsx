import * as React from 'react';
import { forwardRef } from 'react';

const SvgModalIdRequired = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#2D3748"
      d="M14.24 11H18a.5.5 0 0 0 0-1h-3.76a.51.51 0 0 0-.5.5.5.5 0 0 0 .5.5M14.24 14H18a.5.5 0 0 0 0-1h-3.76a.5.5 0 0 0-.5.5.51.51 0 0 0 .5.5M5.62 16.22a.5.5 0 0 0 .61-.36 2.46 2.46 0 0 1 .89-1.34 2.55 2.55 0 0 1 3.05 0c.436.337.749.808.89 1.34a.5.5 0 0 0 .48.38h.13a.51.51 0 0 0 .36-.61 3.55 3.55 0 0 0-1.25-1.88 3 3 0 0 0-.48-.31 2.71 2.71 0 0 0 1.09-2.17A2.75 2.75 0 1 0 7 13.42q-.248.136-.47.31a3.55 3.55 0 0 0-1.25 1.88.5.5 0 0 0 .34.61m1.28-5A1.75 1.75 0 1 1 8.64 13a1.74 1.74 0 0 1-1.74-1.75z"
    />
    <path
      fill="#2D3748"
      d="M3.77 20h16.46a1.24 1.24 0 0 0 1.24-1.25V5.27A1.24 1.24 0 0 0 20.23 4H3.77a1.24 1.24 0 0 0-1.24 1.27v13.46A1.24 1.24 0 0 0 3.77 20M3.53 5.27A.25.25 0 0 1 3.77 5h16.46a.25.25 0 0 1 .24.25v13.48a.25.25 0 0 1-.24.25H3.77a.25.25 0 0 1-.24-.25z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgModalIdRequired);
export default ForwardRef;
