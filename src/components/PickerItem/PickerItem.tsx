import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View } from 'react-native';

import { Flag } from '../Flag';
import { StyledText } from '../StyledText';

import { ICountry } from '../../types';

import styles from './styles';

interface IPickerItemProps {
  country: ICountry;
  onCountrySelect: (code: string) => void;
  textStyle?: StyleProp<TextStyle>;
}

const PickerItem: React.FC<IPickerItemProps> = ({ country, onCountrySelect, textStyle }) => {
  const { name, flag, callingCode } = country;
  return (
    <TouchableOpacity onPress={() => onCountrySelect(callingCode)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Flag flag={flag} />
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
