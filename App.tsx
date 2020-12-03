/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { CallingCodePicker } from './src';
import { spacing } from './src/theme';

const App = () => {
  const [selectedCallingCode, setSelectedCallingCode] = useState<string>('90');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
        <CallingCodePicker
          selectedValue={selectedCallingCode}
          onValueChange={v => setSelectedCallingCode(v)}
          togglerContainerStyle={styles.togglerStyle}
        />
      </View>
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
  inputContainer: {
    position: 'relative',
  },
  input: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    borderBottomWidth: 1,
    paddingLeft: 120,
  },
  togglerStyle: {
    position: 'absolute',
    left: 0,
    bottom: 20,
  },
});
