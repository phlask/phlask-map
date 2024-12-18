import * as React from 'react';
import { forwardRef } from 'react';

const SvgJoinCivicIcon = ({ title, titleId, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 29 28"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g
      stroke="#2D3848"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.63}
      clipPath="url(#JoinCivicIcon_svg__a)"
    >
      <path d="m6.56 15.508-5.51 4.45V2.125c0-.293.115-.587.327-.782.212-.212.489-.326.782-.326h17.833c.293 0 .586.114.782.326.212.212.326.489.326.782v12.258c0 .293-.114.587-.326.782a1.1 1.1 0 0 1-.782.326H6.56z" />
      <path d="M7.732 15.509v5.574c0 .294.115.587.326.783.212.212.49.326.783.326h13.431l5.51 4.45V8.825a1.07 1.07 0 0 0-.326-.782 1.1 1.1 0 0 0-.783-.326H21.1M4.408 6.837 6.56 4.783a.51.51 0 0 1 .75.032l1.516 1.663a.513.513 0 0 0 .717.049l2.2-1.81a.524.524 0 0 1 .701.033l1.826 1.76a.53.53 0 0 0 .717.017l2.412-2.103" />
      <path d="M4.408 11.776 6.56 9.721a.51.51 0 0 1 .75.032l1.516 1.663a.513.513 0 0 0 .717.049l2.2-1.81a.524.524 0 0 1 .701.033l1.826 1.76a.53.53 0 0 0 .717.017l2.412-2.103M11.563 18.98l2.151-2.053a.51.51 0 0 1 .75.032l1.516 1.663a.514.514 0 0 0 .717.049l2.2-1.81a.524.524 0 0 1 .702.033l1.825 1.76a.53.53 0 0 0 .717.017l2.413-2.103M21.1 12.934l.327.326a.53.53 0 0 0 .717.016l2.412-2.103" />
    </g>
    <defs>
      <clipPath id="JoinCivicIcon_svg__a">
        <path fill="#fff" d="M.236.202h28.38v27.254H.235z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgJoinCivicIcon);
export default ForwardRef;
