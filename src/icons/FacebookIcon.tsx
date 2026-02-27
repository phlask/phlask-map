import type { SVGProps } from 'react';

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 20 20"
    {...props}
  >
    <defs>
      <mask id="rounded-corners">
        <rect width="20" height="20" rx="4" fill="white" />
      </mask>
    </defs>

    <g mask="url(#rounded-corners)">
      <path
        fill="#3B5998"
        fillRule="evenodd"
        d="M18.896 0H1.104A1.104 1.104 0 0 0 0 1.104v17.792C0 19.506.494 20 1.104 20h9.579v-7.745H8.076V9.237h2.607V7.011c0-2.584 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119V5.84h-1.598c-1.253 0-1.496.596-1.496 1.47v1.927h2.989l-.389 3.018h-2.6V20h5.097C19.506 20 20 19.506 20 18.896V1.104C20 .494 19.506 0 18.896 0z"
      />
    </g>
  </svg>
);

export default FacebookIcon;
