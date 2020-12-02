import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { borderRadii, spacing } from '../theme';

interface IFlagProps {
  selectedCountryCode?: string;
}

const Flag: React.FC<IFlagProps> = ({ selectedCountryCode }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://www.countryflags.io/${selectedCountryCode}/shiny/64.png`,
        }}
        resizeMethod="scale"
      />
    </View>
  );
};

export default Flag;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 30,
    borderRadius: borderRadii.s,
    marginRight: spacing.s,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
