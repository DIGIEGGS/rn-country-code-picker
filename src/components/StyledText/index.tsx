import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { IStyledTextProps } from '../../types';
import styles from './styles';

const StyledText: React.FC<IStyledTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children} </Text>;
};

export default StyledText;
