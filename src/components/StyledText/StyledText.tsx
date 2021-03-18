import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import styles from './styles';

interface IStyledTextProps {
  style?: StyleProp<TextStyle>;
}

const StyledText: React.FC<IStyledTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default StyledText;
