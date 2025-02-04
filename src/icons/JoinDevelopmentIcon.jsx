import * as React from 'react';
import { forwardRef } from 'react';

const SvgJoinDevelopmentIcon = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 28"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#000"
      fillRule="evenodd"
      d="M5.633 2a3 3 0 0 0-3 3v17.067a3 3 0 0 0 3 3h11.733a3 3 0 0 0 3-3v-13.8h-1.533a5 5 0 0 1-5-5V2zm16.733 20.067V6.84l-.308-.295L15.525.278 15.235 0H5.633a5 5 0 0 0-5 5v17.067a5 5 0 0 0 5 5h11.733a5 5 0 0 0 5-5m-3.487-15.8-3.045-2.921a3 3 0 0 0 2.999 2.92zM14 9.039a1 1 0 0 0-1.942-.478L9.306 19.746a1 1 0 0 0 1.942.478zm1.385 2.269a1 1 0 1 0-.951 1.76l2.805 1.515-2.832 1.644a1 1 0 0 0 1.004 1.73l2.832-1.645c1.352-.784 1.321-2.746-.053-3.489zm-6.82 1.76a1 1 0 0 0-.95-1.76l-2.806 1.515c-1.374.743-1.405 2.705-.053 3.49l2.832 1.644a1 1 0 1 0 1.004-1.73L5.76 14.583z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgJoinDevelopmentIcon);
export default ForwardRef;
