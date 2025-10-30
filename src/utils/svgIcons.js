import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

export const MicOutlineIcon = ({ size = 24, stroke = '#1D293D', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17 8V12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
      stroke={stroke}
      strokeWidth={1.5}
    />
    <Path
      d="M17 8H14M17 12H14"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M20 12C20 16.4183 16.4183 20 12 20M12 20C7.58172 20 4 16.4183 4 12M12 20V23M12 23H15M12 23H9"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export const SessionDurationIcon = ({
  size = 24,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 22C6.47711 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.4777 2 20.2257 4.94289 21.5 9H19"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 8V12L14 14"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.9551 13C21.9848 12.6709 22 12.3373 22 12M15 22C15.3416 21.8876 15.6753 21.7564 16 21.6078M20.7906 17C20.9835 16.6284 21.1555 16.2433 21.305 15.8462M18.1925 20.2292C18.5369 19.9441 18.8631 19.6358 19.1688 19.3065"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SessionModeIcon = ({
  size = 24,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.5 19H8.51"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 5H18M13 8H15.5"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 15.999V16.9992C14 19.3566 14 20.5353 13.2678 21.2676C12.5355 22 11.357 22 9 22H8C5.64298 22 4.46447 22 3.73223 21.2676C3 20.5353 3 19.3566 3 16.9992V10.9982C3 8.6408 3 7.4621 3.73223 6.72974C4.35264 6.10923 5.29344 6.01447 7 6"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 6V7C10 8.88562 10 9.82843 10.5858 10.4142C11.1716 11 12.1144 11 14 11V13L17 11C18.8856 11 19.8284 11 20.4142 10.4142C21 9.82843 21 8.88562 21 7V6C21 4.11438 21 3.17157 20.4142 2.58579C19.8284 2 18.8856 2 17 2H14C12.1144 2 11.1716 2 10.5858 2.58579C10 3.17157 10 4.11438 10 6Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AvailabilityCalendarIcon = ({
  size = 20,
  stroke = '#FFFFFF',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M13.3333 1.6665V4.99984M6.66663 1.6665V4.99984"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.5 10.0002C17.5 6.85746 17.5 5.28612 16.5237 4.3098C15.5474 3.3335 13.976 3.3335 10.8333 3.3335H9.16667C6.02397 3.3335 4.45262 3.3335 3.47631 4.3098C2.5 5.28612 2.5 6.85746 2.5 10.0002V11.6668C2.5 14.8095 2.5 16.3809 3.47631 17.3572C4.45262 18.3335 6.02397 18.3335 9.16667 18.3335"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 8.3335H17.5"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.2226 15.5841L14.1667 14.9998V13.5555M17.5 14.9998C17.5 16.8408 16.0076 18.3332 14.1667 18.3332C12.3258 18.3332 10.8334 16.8408 10.8334 14.9998C10.8334 13.1589 12.3258 11.6665 14.1667 11.6665C16.0076 11.6665 17.5 13.1589 17.5 14.9998Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const serviceBackIconXml = `
<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="52" height="52" rx="10" fill="black" fill-opacity="0.15"/>
<path d="M23.9235 33.3801C23.9235 33.3801 17.3112 27.7271 17.3111 25.9999C17.3111 24.2728 23.9236 18.6199 23.9236 18.6199M18.0454 25.9999L35.7231 25.9999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const ServiceBackIcon = ({ size = 52, ...props }) => (
  <SvgXml xml={serviceBackIconXml} width={size} height={size} {...props} />
);
