import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { colors } from '../theme';
import { SvgArrowDown } from './icons';
import Flag from './Flag';
import StyledText from './StyledText';

interface IPickerTogglerProps {
  selectedValue: string;
  selectedCountryCode?: string;
  isPickerOpen: boolean;
  onPickerToggle: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PickerToggler: React.FC<IPickerTogglerProps> = ({
  selectedValue,
  selectedCountryCode,
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
          <Flag {...{ selectedCountryCode }} />
          <StyledText style={textStyle}>{`+${selectedValue}`}</StyledText>
          <View style={arrowDownStyle}>
            <SvgArrowDown color={colors.black} width={18} height={18} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickerToggler;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 40,
    height: 30,
  },
});
