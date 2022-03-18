import React, { createRef } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { onLayoutToggle } from '../../functions/utility';
import { colors } from '../../theme';
import { IPickerTogglerProps } from '../../types';
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
  customFlag,
  isFlagVisible = true,
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
      <TouchableOpacity onPress={() => onPickerToggle(!isPickerOpen)} testID="toggler-button">
        <View style={styles.innerContainer}>
          {isFlagVisible && (customFlag ?? <Flag flag={flag} />)}
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
