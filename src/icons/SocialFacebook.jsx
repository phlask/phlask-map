import * as React from 'react';
import { forwardRef } from 'react';

const SvgSocialFacebook = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#SocialFacebook_svg__a)">
      <rect width={48} height={48} fill="#3B5998" rx={4} />
      <path
        fill="#fff"
        d="m37.094 30.476 1.082-7.125h-6.768V18.73c0-1.95.943-3.852 3.975-3.852h3.08V8.812S35.668 8.331 33 8.331c-5.577 0-9.22 3.413-9.22 9.59v5.43h-6.196v7.125h6.197V48h7.627V30.476z"
      />
    </g>
    <defs>
      <clipPath id="SocialFacebook_svg__a">
        <path fill="#fff" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgSocialFacebook);
export default ForwardRef;
