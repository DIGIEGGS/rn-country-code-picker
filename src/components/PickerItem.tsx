import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';

import { colors, spacing } from '../theme';
import Flag from './Flag';
import StyledText from './StyledText';

interface IPickerItemProps {
  item: any;
  onItemSelect: (v: string) => void;
  textStyle?: StyleProp<TextStyle>;
}

const PickerItem: React.FC<IPickerItemProps> = ({ item, onItemSelect, textStyle }) => {
  return (
    <TouchableOpacity onPress={() => onItemSelect(item.callingCodes[0])}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Flag selectedCountryCode={item.alpha2Code.toLowerCase()} />
        </View>
        <View style={styles.codeContainer}>
          <StyledText style={textStyle}>{`+${item.callingCodes[0]}`}</StyledText>
        </View>
        <StyledText style={textStyle}>{item.name}</StyledText>
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
