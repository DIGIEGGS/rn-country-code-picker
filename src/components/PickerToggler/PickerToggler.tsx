import React, { useEffect, useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Flag } from '../Flag';
import { StyledText } from '../StyledText';

import { SvgArrowDown } from '../icons';
import { colors } from '../../theme';

import styles from './styles';

interface IPickerTogglerProps {
  selectedCode?: string;
  flag?: any;
  onPickerToggle: (isOpen: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PickerToggler: React.FC<IPickerTogglerProps> = ({
  selectedCode,
  flag,
  onPickerToggle,
  containerStyle,
  textStyle,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const arrowDownStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        rotate: isOpen ? '180deg' : '0deg',
      },
    ],
  };

  useEffect(() => {
    onPickerToggle(isOpen);
  }, [isOpen, onPickerToggle]);

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => setIsOpen(state => !state)} testID="toggler-button">
        <View style={styles.innerContainer}>
          <Flag flag={flag} />
          <StyledText style={textStyle}>{`+${selectedCode}`}</StyledText>
          <View style={arrowDownStyle} testID="arrow-down-icon">
            <SvgArrowDown color={colors.black} width={18} height={18} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerToggler;
