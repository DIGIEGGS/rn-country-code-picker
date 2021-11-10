import React, { createRef, useRef } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { onLayoutToggle } from '../../functions/utility';
import { colors } from '../../theme';
import { IItemMeasure, IPickerTogglerProps } from '../../types';
import Flag from '../Flag';
import { SvgArrowDown } from '../icons';
import StyledText from '../StyledText';
import styles from './styles';

const PickerToggler: React.FC<IPickerTogglerProps> = ({
  selectedCode,
  flag,
  isPickerOpen,
  onPickerToggle,
  containerStyle,
  textStyle,
  onLayout,
}) => {
  const containerRef = createRef<View>();

  const arrowDownStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        rotate: isPickerOpen ? '180deg' : '0deg',
      },
    ],
  };

  return (
    <View
      style={containerStyle}
      ref={containerRef}
      onLayout={() => onLayoutToggle(containerRef, measure => onLayout(measure))}
    >
      <TouchableOpacity onPress={onPickerToggle}>
        <View style={styles.innerContainer}>
          <Flag flag={flag} />
          <StyledText style={textStyle}>{`+${selectedCode}`}</StyledText>
          <View style={arrowDownStyle}>
            <SvgArrowDown color={colors.black} width={18} height={18} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerToggler;
