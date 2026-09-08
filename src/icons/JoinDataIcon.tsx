import type { SVGProps } from 'react';

const SvgJoinDataIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    fill="none"
    {...props}
  >
    <g
      stroke="#000"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M239.985 55.994c0 22.089-50.138 39.994-111.985 39.994S16.015 78.083 16.015 55.994 66.153 16 128 16s111.985 17.905 111.985 39.994z"
      />

      <path d="M239.985 103.987c-13.998 21.648-55.992 34.637-111.985 34.637s-97.987-12.989-111.985-34.637" />

      <path d="M239.985 151.981c-13.998 21.647-55.992 34.636-111.985 34.636s-97.987-12.989-111.985-34.636" />

      <path d="M239.985 199.974c-13.998 21.648-55.992 34.637-111.985 34.637s-97.987-12.989-111.985-34.637" />

      <path d="M16.015 55.994v143.98M239.985 55.994v143.98" />
    </g>
  </svg>
);

export default SvgJoinDataIcon;
