import React from 'react';

export interface Props {
  fill: any;
  className: any;
  stroke: any;

}

const SvgLogOut = ({ ...Props }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
      <path d="M15.1998 0H8.7998C8.2998 0 7.7998 0.4 7.7998 1C7.7998 1.6 8.1998 2 8.7998 2H15.1998C15.4998 2 15.6998 2.2 15.6998 2.5V15.3C15.6998 15.6 15.4998 15.8 15.1998 15.8H8.7998C8.2998 15.8 7.7998 16.2 7.7998 16.8C7.7998 17.4 8.1998 17.8 8.7998 17.8H15.1998C16.4998 17.8 17.5998 16.7 17.5998 15.4V2.4C17.5998 1.1 16.4998 0 15.1998 0Z" fill="#686E7B" />
      <path d="M10.9 7.8H3.3L5.9 5.2C6.1 5 6.2 4.8 6.2 4.5C6.2 4.2 6.1 4 5.9 3.8C5.5 3.4 4.9 3.4 4.5 3.8L0.3 8.1C0.1 8.2 0 8.5 0 8.8C0 9 0.1 9.2 0.3 9.4L4.6 13.6C4.8 13.9 5 14 5.3 14C5.6 14 5.8 13.9 6 13.7C6.2 13.5 6.3 13.3 6.3 13C6.3 12.7 6.2 12.5 6 12.3L3.3 9.7H10.9C11.4 9.7 11.9 9.3 11.9 8.7C11.9 8.1 11.5 7.8 10.9 7.8Z" fill="#686E7B" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="17.6" height="17.5" fill="white" />
      </clipPath>
    </defs>
  </svg>

);
export default SvgLogOut;



