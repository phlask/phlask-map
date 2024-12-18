import * as React from 'react';
import { forwardRef } from 'react';

const SvgJoinManagementIcon = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 27 25"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#000"
      fillRule="evenodd"
      d="M5.45 3.246a2.186 2.186 0 0 1 3.911-.072l-.017.072zM7.423 0c1.177 0 2.24.485 3 1.267a4.17 4.17 0 0 1 3-1.267c1.177 0 2.24.485 3 1.267a4.187 4.187 0 0 1 7.085 2.004 3 3 0 0 1 2.607 2.975v14.789a3 3 0 0 1-3 3H3.883a3 3 0 0 1-3-3V6.245a3 3 0 0 1 2.45-2.95A4.19 4.19 0 0 1 7.423 0m13.974 3.246a2.186 2.186 0 0 0-3.911-.072l.017.072zm-6.024 2a4.19 4.19 0 0 0 4.05 3.125 1 1 0 1 0 0-2 2.19 2.19 0 0 1-1.911-1.125h5.603a1 1 0 0 1 1 1v14.789a1 1 0 0 1-1 1H3.883a1 1 0 0 1-1-1V6.245a1 1 0 0 1 .524-.879 4.19 4.19 0 0 0 4.016 3.005 1 1 0 1 0 0-2 2.19 2.19 0 0 1-1.911-1.125h3.861a4.19 4.19 0 0 0 4.05 3.125 1 1 0 1 0 0-2 2.19 2.19 0 0 1-1.911-1.125zm-.012-2.072-.017.072h-3.841l-.017-.072a2.185 2.185 0 0 1 3.875 0m-10.5 7.57a1 1 0 0 1 1-1h7.902a1 1 0 0 1 0 2H5.86a1 1 0 0 1-1-1m12.643 0a1 1 0 0 1 1-1h2.634a1 1 0 0 1 0 2h-2.634a1 1 0 0 1-1-1M4.86 14.693a1 1 0 0 1 1-1h7.903a1 1 0 0 1 0 2H5.86a1 1 0 0 1-1-1m12.644 0a1 1 0 0 1 1-1h2.634a1 1 0 0 1 0 2h-2.634a1 1 0 0 1-1-1M4.86 18.422a1 1 0 0 1 1-1h7.903a1 1 0 0 1 0 2H5.86a1 1 0 0 1-1-1m12.644 0a1 1 0 0 1 1-1h2.634a1 1 0 0 1 0 2h-2.634a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgJoinManagementIcon);
export default ForwardRef;
