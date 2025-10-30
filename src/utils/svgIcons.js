import React from 'react';
import Svg, { Path } from 'react-native-svg';

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

