import React from 'react';

export interface Props {
  // fill: any;
  className: any;
  stroke: any;

}

const SvgLearning = ({ ...Props }) => (

  <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.46948 19H4.07042L3.75117 18.6833C3.51174 18.3667 3.19249 17.8917 5.34742 11.0042H0L3.19249 0H11.5728L10.216 5.38333H17L15.8826 6.72917C5.18779 19 4.94836 19 4.46948 19ZM2.15493 9.34167H7.58216L7.26291 10.3708C6.62441 12.1917 6.06573 14.3292 5.66667 15.8333C7.58216 13.6958 10.9343 9.975 13.5681 6.8875H8.22066L9.49765 1.58333H4.38967L2.15493 9.34167Z" fill="#686E7B" />
  </svg>

);
export default SvgLearning;


