/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CallingCodePicker from './src/components/CallingCodePicker';
import PickerItem from './src/components/PickerItem';
import countries from './src/data/countries';
import { spacing } from './src/theme';

const App = () => {
  const [selectedCode, setSelectedCode] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text>selected code is: {selectedCode}</Text>
      <CallingCodePicker onValueChange={setSelectedCode} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.l,
  },
});
