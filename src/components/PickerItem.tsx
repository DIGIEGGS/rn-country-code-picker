import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';

import { ICountry } from '../types';
import { colors, spacing } from '../theme';
import Flag from './Flag';
import StyledText from './StyledText';

interface IPickerItemProps {
  item: ICountry;
  onCountrySelect: (country: ICountry) => void;
  textStyle?: StyleProp<TextStyle>;
}

const PickerItem: React.FC<IPickerItemProps> = ({ item, onCountrySelect, textStyle }) => {
  const { name, flag, callingCode } = item;
  return (
    <TouchableOpacity onPress={() => onCountrySelect(item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Flag {...{ flag }} />
        </View>
        <View style={styles.codeContainer}>
          <StyledText style={textStyle}>{`+${callingCode}`}</StyledText>
        </View>
        <StyledText style={textStyle}>{name}</StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default PickerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.m,
    marginBottom: spacing.m,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: 40,
    height: 30,
    borderRadius: 4,
    marginRight: spacing.m,
  },
  codeContainer: {
    width: 60,
    marginRight: spacing.m,
  },
});
