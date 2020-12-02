import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { colors } from '../theme';

interface IStyledTextProps {
  style?: StyleProp<TextStyle>;
}

const StyledText: React.FC<IStyledTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children} </Text>;
};

export default StyledText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
});
