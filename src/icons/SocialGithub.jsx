import * as React from 'react';
import { forwardRef } from 'react';

const SvgSocialGithub = ({ title, titleId, ...props }, ref) => (
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
    <g fill="#2D3748" clipPath="url(#SocialGithub_svg__a)">
      <path d="M9.6 1.94A10.7 10.7 0 0 1 18.69 4 10.48 10.48 0 0 0 2.11 8.21 10.59 10.59 0 0 1 9.6 1.94" />
      <path d="M22.38 12a10.44 10.44 0 0 0-3.69-8A10.7 10.7 0 0 0 9.6 1.94a10.59 10.59 0 0 0-7.49 6.27A10.49 10.49 0 0 0 9 22.08a.42.42 0 0 0 .35-.39v-1.85l-.95.08a2.56 2.56 0 0 1-2.7-1.67 3 3 0 0 0-1.16-1.42 3.5 3.5 0 0 1-.39-.38v-.15q.33-.045.66 0a2.3 2.3 0 0 1 1.49 1.11 2.19 2.19 0 0 0 2.82.9.49.49 0 0 0 .28-.31c.18-.39.34-.8.51-1.23a1.4 1.4 0 0 1-.3-.05Q8.426 16.452 7.3 16C5 14.83 4.55 10.76 6.08 9.05a.52.52 0 0 0 .11-.56 3.9 3.9 0 0 1 .06-2.09c.09-.37.3-.51.63-.38.73.28 1.44.61 2.17.89.18.086.38.12.58.1a10.8 10.8 0 0 1 4.7 0 1.2 1.2 0 0 0 .61-.1c.73-.29 1.45-.61 2.18-.89.29-.11.48 0 .57.35a4 4 0 0 1 .07 2.18.5.5 0 0 0 .06.4 4.53 4.53 0 0 1 .92 3.44 4.29 4.29 0 0 1-3.58 4.18l-1.16.22a3 3 0 0 1 .62 2.21v2.34c0 .4.12.62.34.7A10.5 10.5 0 0 0 22.38 12" />
    </g>
    <defs>
      <clipPath id="SocialGithub_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgSocialGithub);
export default ForwardRef;
