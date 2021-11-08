import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IPickerItemProps } from '../../types';
import Flag from '../Flag';
import StyledText from '../StyledText';
import styles from './styles';

const PickerItem: React.FC<IPickerItemProps> = ({ country, onCountrySelect, textStyle }) => {
  const { name, flag, callingCode } = country;
  return (
    <TouchableOpacity onPress={() => onCountrySelect(country)}>
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
