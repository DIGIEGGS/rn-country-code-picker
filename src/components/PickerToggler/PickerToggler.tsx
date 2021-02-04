import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Flag } from '../Flag';
import { StyledText } from '../StyledText';

import { SvgArrowDown } from '../icons';
import { colors } from '../../theme';

import styles from './styles';

interface IPickerTogglerProps {
  selectedCode?: string;
  flag?: any;
  isPickerOpen: boolean;
  onPickerToggle: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PickerToggler: React.FC<IPickerTogglerProps> = ({
  selectedCode,
  flag,
  isPickerOpen,
  onPickerToggle,
  containerStyle,
  textStyle,
}) => {
  const arrowDownStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        rotate: isPickerOpen ? '180deg' : '0deg',
      },
    ],
  };

  return (
    <View style={containerStyle}>
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
