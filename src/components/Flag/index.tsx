import React from 'react';
import { Image, View } from 'react-native';
import { IFlagProps } from '../../types';
import styles from './styles';

const Flag: React.FC<IFlagProps> = ({ flag }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={flag} resizeMethod="scale" testID="flag-image" />
    </View>
  );
};

export default Flag;
