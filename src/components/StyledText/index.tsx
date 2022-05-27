import React from 'react';
import { Text } from 'react-native';
import { IStyledTextProps } from '../../types';
import styles from './styles';

const StyledText = ({ children, style }: IStyledTextProps) => {
  return <Text style={[style, styles.text]}>{children} </Text>;
};

export default StyledText;
