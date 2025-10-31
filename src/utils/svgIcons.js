import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
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

export const CalendarPillIcon = ({
  size = 16,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M5.33337 1.3335V3.3335"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
    <Path
      d="M10.6666 1.3335V3.3335"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
    <Path
      d="M2.33337 6.06006H13.6667"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
    <Path
      d="M14 5.66683V11.3335C14 13.3335 13 14.6668 10.6667 14.6668H5.33333C3 14.6668 2 13.3335 2 11.3335V5.66683C2 3.66683 3 2.3335 5.33333 2.3335H10.6667C13 2.3335 14 3.66683 14 5.66683Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
    <Path
      d="M10.4631 9.13314H10.4691"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M10.4631 11.1331H10.4691"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M7.99703 9.13314H8.00302"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M7.99703 11.1331H8.00302"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M5.5295 9.13314H5.53549"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <Path
      d="M5.5295 11.1331H5.53549"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
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

export const NavArrowLeftIcon = ({ size = 36, stroke = '#1D293D', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" {...props}>
    <Rect width={36} height={36} rx={10} fill="#FFFFFF" />
    <Path d="M21 12C21 12 15 16.4189 15 18C15 19.5812 21 24 21 24" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const NavArrowRightIcon = ({ size = 36, stroke = '#1D293D', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" {...props}>
    <Rect width={36} height={36} rx={10} fill="#FFFFFF" />
    <Path d="M15 12C15 12 21 16.4189 21 18C21 19.5812 15 24 15 24" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookingSuccessBadgeIcon = ({
  size = 66,
  fill = 'white',
  stroke = '#00A63E',
  strokeWidth = 4.125,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 66 66" fill="none" {...props}>
    <Path
      d="M52.2239 52.25H52.25H52.2239ZM52.2239 52.25C50.5114 53.9481 47.4081 53.5252 45.2317 53.5252C42.5604 53.5252 41.2739 54.0477 39.3674 55.9543C37.744 57.5779 35.5677 60.5 33 60.5C30.4323 60.5 28.256 57.5779 26.6326 55.9543C24.726 54.0477 23.4396 53.5252 20.7682 53.5252C18.5919 53.5252 15.4885 53.9481 13.7761 52.25C12.05 50.5384 12.4748 47.4221 12.4748 45.2317C12.4748 42.4639 11.8694 41.1911 9.8983 39.2199C6.96614 36.2879 5.50005 34.8216 5.5 33C5.50003 31.1781 6.96608 29.7121 9.89821 26.78C11.6578 25.0204 12.4748 23.2768 12.4748 20.7682C12.4748 18.5918 12.0518 15.4884 13.75 13.776C15.4617 12.0499 18.5779 12.4747 20.7682 12.4747C23.2767 12.4747 25.0204 11.6578 26.7799 9.89827C29.7121 6.96608 31.1781 5.5 33 5.5C34.8219 5.5 36.2879 6.96608 39.2199 9.89827C40.9791 11.6574 42.7226 12.4747 45.2317 12.4747C47.4081 12.4747 50.5117 12.0518 52.2242 13.75C53.9501 15.4617 53.5252 18.5779 53.5252 20.7682C53.5252 23.5361 54.1307 24.8088 56.1017 26.78C59.034 29.7121 60.5 31.1781 60.5 33C60.5 34.8216 59.034 36.2879 56.1017 39.2199C54.1305 41.1912 53.5252 42.4639 53.5252 45.2317C53.5252 47.4221 53.95 50.5384 52.2239 52.25Z"
      fill={fill}
    />
    <Path
      d="M52.2239 52.25H52.25M52.2239 52.25C50.5114 53.9481 47.4081 53.5252 45.2317 53.5252C42.5604 53.5252 41.2739 54.0477 39.3674 55.9543C37.744 57.5779 35.5677 60.5 33 60.5C30.4323 60.5 28.256 57.5779 26.6326 55.9543C24.726 54.0477 23.4396 53.5252 20.7682 53.5252C18.5919 53.5252 15.4885 53.9481 13.7761 52.25C12.05 50.5384 12.4748 47.4221 12.4748 45.2317C12.4748 42.4639 11.8694 41.1911 9.8983 39.2199C6.96614 36.2879 5.50005 34.8216 5.5 33C5.50003 31.1781 6.96608 29.7121 9.89821 26.78C11.6578 25.0204 12.4748 23.2768 12.4748 20.7682C12.4748 18.5918 12.0518 15.4884 13.75 13.776C15.4617 12.0499 18.5779 12.4747 20.7682 12.4747C23.2767 12.4747 25.0204 11.6578 26.7799 9.89827C29.7121 6.96608 31.1781 5.5 33 5.5C34.8219 5.5 36.2879 6.96608 39.2199 9.89827C40.9791 11.6574 42.7226 12.4747 45.2317 12.4747C47.4081 12.4747 50.5117 12.0518 52.2242 13.75C53.9501 15.4617 53.5252 18.5779 53.5252 20.7682C53.5252 23.5361 54.1307 24.8088 56.1017 26.78C59.034 29.7121 60.5 31.1781 60.5 33C60.5 34.8216 59.034 36.2879 56.1017 39.2199C54.1305 41.1911 53.5252 42.4639 53.5252 45.2317C53.5252 47.4221 53.95 50.5384 52.2239 52.25Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M24.75 35.4555C24.75 35.4555 28.05 37.2479 29.7 39.875C29.7 39.875 34.65 29.5625 41.25 26.125"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClipboardCopyIcon = ({
  size = 16,
  fill = '#FEF8EF',
  stroke = '#62748E',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <Path d="M0 0h16v16H0z" fill={fill} />
    <Path
      d="M10.6666 8.60016V11.4002C10.6666 13.7335 9.73325 14.6668 7.39992 14.6668H4.59992C2.26659 14.6668 1.33325 13.7335 1.33325 11.4002V8.60016C1.33325 6.26683 2.26659 5.3335 4.59992 5.3335H7.39992C9.73325 5.3335 10.6666 6.26683 10.6666 8.60016Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6666 4.60016V7.40016C14.6666 9.7335 13.7333 10.6668 11.3999 10.6668H10.6666V8.60016C10.6666 6.26683 9.73325 5.3335 7.39992 5.3335H5.33325V4.60016C5.33325 2.26683 6.26659 1.3335 8.59992 1.3335H11.3999C13.7333 1.3335 14.6666 2.26683 14.6666 4.60016Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
