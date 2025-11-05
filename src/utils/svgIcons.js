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

export const BookingDateIcon = ({
  size = 24,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M16 2V6M8 2V6"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 10H21"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.2671 18.7011L17 18V16.2668M21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 15.7909 14.7909 14 17 14C19.2091 14 21 15.7909 21 18Z"
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

export const ZoomMeetingIcon = ({
  size = 24,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2 10V8C2 7.05719 2 6.58579 2.29289 6.29289C2.58579 6 3.05719 6 4 6H7C10.7712 6 12.6569 6 13.8284 7.17157C15 8.34315 15 10.2288 15 14V16C15 16.9428 15 17.4142 14.7071 17.7071C14.4142 18 13.9428 18 13 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.8995 9.07049L18.5997 8.39526C20.0495 6.99707 20.7744 6.29798 21.3872 6.55106C22 6.80414 22 7.80262 22 9.79956V14.2004C22 16.1974 22 17.1959 21.3872 17.4489C20.7744 17.702 20.0495 17.0029 18.5997 15.6047L17.8995 14.9295C17.0122 14.0738 17 14.0453 17 12.8231V11.1769C17 9.95473 17.0122 9.92624 17.8995 9.07049Z"
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

export const ProductFilterIcon = ({
  size = 24,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M20.6693 7C20.7527 6.8184 20.7971 6.62572 20.8297 6.37281C21.0319 4.8008 21.133 4.0148 20.672 3.5074C20.2111 3 19.396 3 17.7657 3H6.23433C4.60404 3 3.7889 3 3.32795 3.5074C2.86701 4.0148 2.96811 4.8008 3.17033 6.3728C3.22938 6.8319 3.3276 7.09253 3.62734 7.44867C4.59564 8.59915 6.36901 10.6456 8.85746 12.5061C9.08486 12.6761 9.23409 12.9539 9.25927 13.2614C9.53961 16.6864 9.79643 19.0261 9.93278 20.1778C10.0043 20.782 10.6741 21.2466 11.226 20.8563C12.1532 20.2006 13.8853 19.4657 14.1141 18.2442C14.2223 17.6668 14.3806 16.6588 14.5593 15"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.5 8V15M21 11.5H14"
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

export const UserCircleIcon = ({
  size = 21,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
    <Path
      d="M10.5 10.5C12.9162 10.5 14.875 8.54125 14.875 6.125C14.875 3.70875 12.9162 1.75 10.5 1.75C8.08375 1.75 6.125 3.70875 6.125 6.125C6.125 8.54125 8.08375 10.5 10.5 10.5Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.0161 19.25C18.0161 15.8638 14.6474 13.125 10.4999 13.125C6.35239 13.125 2.98364 15.8638 2.98364 19.25"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MailOutlineIcon = ({
  size = 22,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M15.5833 18.7918H6.41659C3.66659 18.7918 1.83325 17.4168 1.83325 14.2085V7.79183C1.83325 4.5835 3.66659 3.2085 6.41659 3.2085H15.5833C18.3333 3.2085 20.1666 4.5835 20.1666 7.79183V14.2085C20.1666 17.4168 18.3333 18.7918 15.5833 18.7918Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
    <Path
      d="M15.5834 8.25L12.7142 10.5417C11.7701 11.2933 10.2209 11.2933 9.27674 10.5417L6.41675 8.25"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
  </Svg>
);

export const PhoneOutlineIcon = ({
  size = 21,
  stroke = '#1D293D',
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
    <Path
      d="M19.2237 16.0387C19.2237 16.3537 19.1537 16.6775 19.005 16.9925C18.8562 17.3075 18.6638 17.605 18.41 17.885C17.9813 18.3575 17.5087 18.6988 16.975 18.9175C16.45 19.1363 15.8813 19.25 15.2688 19.25C14.3763 19.25 13.4225 19.04 12.4162 18.6113C11.41 18.1825 10.4037 17.605 9.40625 16.8788C8.4 16.1438 7.44625 15.33 6.53625 14.4287C5.635 13.5187 4.82125 12.565 4.095 11.5675C3.3775 10.57 2.8 9.5725 2.38 8.58375C1.96 7.58625 1.75 6.6325 1.75 5.7225C1.75 5.1275 1.855 4.55875 2.065 4.03375C2.275 3.5 2.6075 3.01 3.07125 2.5725C3.63125 2.02125 4.24375 1.75 4.89125 1.75C5.13625 1.75 5.38125 1.8025 5.6 1.9075C5.8275 2.0125 6.02875 2.17 6.18625 2.3975L8.21625 5.25875C8.37375 5.4775 8.4875 5.67875 8.56625 5.87125C8.645 6.055 8.68875 6.23875 8.68875 6.405C8.68875 6.615 8.6275 6.825 8.505 7.02625C8.39125 7.2275 8.225 7.4375 8.015 7.6475L7.35 8.33875C7.25375 8.435 7.21 8.54875 7.21 8.68875C7.21 8.75875 7.21875 8.82 7.23625 8.89C7.2625 8.96 7.28875 9.0125 7.30625 9.065C7.46375 9.35375 7.735 9.73 8.12 10.185C8.51375 10.64 8.93375 11.1038 9.38875 11.5675C9.86125 12.0313 10.3162 12.46 10.78 12.8537C11.235 13.2387 11.6112 13.5012 11.9087 13.6587C11.9525 13.6762 12.005 13.7025 12.0662 13.7287C12.1362 13.755 12.2062 13.7637 12.285 13.7637C12.4337 13.7637 12.5475 13.7113 12.6437 13.615L13.3088 12.9588C13.5275 12.74 13.7375 12.5737 13.9388 12.4688C14.14 12.3462 14.3412 12.285 14.56 12.285C14.7262 12.285 14.9013 12.32 15.0938 12.3988C15.2862 12.4775 15.4875 12.5913 15.7063 12.74L18.6025 14.7962C18.83 14.9537 18.9875 15.1375 19.0837 15.3562C19.1712 15.575 19.2237 15.7937 19.2237 16.0387Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
  </Svg>
);

export const RupeeCircleIcon = ({
  size = 17,
  fill = '#1D293D',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.125 0C3.6375 0 0 3.6375 0 8.125C0 12.6125 3.6375 16.25 8.125 16.25C12.6125 16.25 16.25 12.6125 16.25 8.125C16.25 3.6375 12.6125 0 8.125 0ZM5.625 4.375C5.45924 4.375 5.30027 4.44085 5.18306 4.55806C5.06585 4.67527 5 4.83424 5 5C5 5.16576 5.06585 5.32473 5.18306 5.44194C5.30027 5.55915 5.45924 5.625 5.625 5.625H6.875C7.69167 5.625 8.38583 6.14667 8.64333 6.875H5.625C5.45924 6.875 5.30027 6.94085 5.18306 7.05806C5.06585 7.17527 5 7.33424 5 7.5C5 7.66576 5.06585 7.82473 5.18306 7.94194C5.30027 8.05915 5.45924 8.125 5.625 8.125H8.64333C8.51395 8.49059 8.27444 8.80709 7.95776 9.03094C7.64108 9.25479 7.26281 9.375 6.875 9.375H5.625C5.50147 9.37511 5.38074 9.41182 5.27806 9.48051C5.17538 9.54919 5.09535 9.64676 5.04809 9.7609C5.00083 9.87503 4.98846 10.0006 5.01253 10.1218C5.0366 10.2429 5.09604 10.3543 5.18333 10.4417L7.68333 12.9417C7.74055 13.0031 7.80955 13.0523 7.88622 13.0865C7.96288 13.1206 8.04564 13.139 8.12956 13.1405C8.21348 13.142 8.29684 13.1265 8.37466 13.0951C8.45249 13.0637 8.52318 13.0169 8.58253 12.9575C8.64188 12.8982 8.68867 12.8275 8.7201 12.7497C8.75154 12.6718 8.76697 12.5885 8.76549 12.5046C8.76401 12.4206 8.74564 12.3379 8.71148 12.2612C8.67732 12.1846 8.62807 12.1156 8.56667 12.0583L7.125 10.615C7.80027 10.5607 8.43963 10.2885 8.94685 9.83943C9.45408 9.39037 9.80174 8.78871 9.9375 8.125H10.625C10.7908 8.125 10.9497 8.05915 11.0669 7.94194C11.1842 7.82473 11.25 7.66576 11.25 7.5C11.25 7.33424 11.1842 7.17527 11.0669 7.05806C10.9497 6.94085 10.7908 6.875 10.625 6.875H9.9375C9.84527 6.42169 9.65311 5.99466 9.375 5.625H10.625C10.7908 5.625 10.9497 5.55915 11.0669 5.44194C11.1842 5.32473 11.25 5.16576 11.25 5C11.25 4.83424 11.1842 4.67527 11.0669 4.55806C10.9497 4.44085 10.7908 4.375 10.625 4.375H5.625Z"
      fill={fill}
    />
  </Svg>
);
