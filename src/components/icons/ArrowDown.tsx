import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgArrowDown(props: SvgProps) {
  return (
    <Svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </Svg>
  );
}

export default SvgArrowDown;
