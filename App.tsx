/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CallingCodePicker } from './src';
import { spacing } from './src/theme';

const App = () => {
  const [selectedCallingCode, setSelectedCallingCode] = useState<string>('');

  return (
    <View style={styles.container}>
      <CallingCodePicker
        selectedValue={selectedCallingCode}
        onValueChange={v => setSelectedCallingCode(v)}
      />
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
