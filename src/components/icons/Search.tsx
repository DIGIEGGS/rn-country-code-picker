import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgSearch(props: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}

export default SvgSearch;
