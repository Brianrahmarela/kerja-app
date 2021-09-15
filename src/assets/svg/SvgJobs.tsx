import React from 'react';

export interface Props {
  // fill: any;
  className: any;
  stroke: any;

}

const SvgJobs = ({ ...Props }) => (

  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 3.61353H1.25V5.66667H13.3333V3.61353Z" fill="#686E7B" />
    <path d="M8.16634 6.98067H1.33301V8.86956H8.16634V6.98067Z" fill="#686E7B" />
    <path d="M17.3333 1.64251V15.2754L1.66667 15.3575V1.64251H17.3333ZM17.3333 0H1.66667C0.75 0 0 0.73913 0 1.64251V15.3575C0 16.2609 0.75 17 1.66667 17H17.3333C18.25 17 19 16.2609 19 15.3575V1.64251C19 0.73913 18.25 0 17.3333 0Z" fill="#686E7B" />
  </svg>


);
export default SvgJobs;


