import React from 'react';

export interface Props {
  // fill: any;
  className: any;
  stroke: any;

}

const SvgJobs = ({ ...Props }) => (

  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.541992 5H12.542" stroke="#686E7B" stroke-width="2" stroke-miterlimit="10" />
    <path d="M1.31348 8.09178H7.49705" stroke="#686E7B" stroke-width="2" stroke-miterlimit="10" />
    <path d="M16.0773 1.54589V14.4541H1.54589V1.54589H16.0773ZM16.0773 0H1.54589C0.695652 0 0 0.695652 0 1.54589V14.4541C0 15.3043 0.695652 16 1.54589 16H16.0773C16.9275 16 17.6232 15.3043 17.6232 14.4541V1.54589C17.6232 0.695652 16.9275 0 16.0773 0Z" fill="#686E7B" />
  </svg>

);
export default SvgJobs;


