import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const SvgSocialTwitter = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    ref={ref}
    {...props}
  >
    <path
      fill="#1D9BF0"
      d="M42.113 14.361c.019.423.019.826.019 1.248.018 12.807-9.39 27.59-26.597 27.59-5.075 0-10.057-1.516-14.336-4.358.741.096 1.482.135 2.223.135 4.204 0 8.297-1.46 11.613-4.167-4-.076-7.52-2.784-8.742-6.739a8.7 8.7 0 0 0 4.222-.173c-4.352-.883-7.482-4.857-7.5-9.484v-.116a9 9 0 0 0 4.24 1.21C3.163 16.665 1.886 11 4.367 6.567c4.76 6.066 11.762 9.734 19.281 10.137-.76-3.36.278-6.893 2.705-9.274 3.76-3.667 9.686-3.475 13.242.422a18.2 18.2 0 0 0 5.946-2.361c-.704 2.246-2.167 4.147-4.112 5.357a18.7 18.7 0 0 0 5.371-1.517 19.5 19.5 0 0 1-4.686 5.03"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgSocialTwitter);
export default ForwardRef;
