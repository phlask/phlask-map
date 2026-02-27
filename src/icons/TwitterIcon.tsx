import type { SVGProps } from 'react';

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <path
      fill="#1D9BF0"
      d="M30 5c-1.1.7-2.2 1.3-3.6 1.6C25.2 5 23.2 4 21 4c-3.9 0-7 3.1-7 7 0 .4 0 .8.1 1.2-4.4-.7-8.3-3-11-6.4C2.6 6.7 2.3 7.8 2.3 9c0 2.2 1.1 4.1 2.7 5.2-1 0-2-.3-2.8-.8v.1c0 3.1 2.1 5.6 4.9 6.2-.5.1-1.1.2-1.6.2-.4 0-.8 0-1.2-.1.8 2.5 3 4.3 5.7 4.4-2.1 1.7-4.8 2.7-7.6 2.7-.5 0-1 0-1.5-.1 2.7 1.8 5.9 2.8 9.4 2.8 11.2 0 17.4-9.5 17.5-17.8L31 10l-3-1 2-4z"
    />
  </svg>
);

export default TwitterIcon;
