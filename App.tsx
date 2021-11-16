import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CallingCodePicker from './src/components/CallingCodePicker';
import { spacing } from './src/theme';

const App = () => {
  const [selectedCode, setSelectedCode] = useState<string | undefined>('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>selected code is: {selectedCode}</Text>
      <CallingCodePicker onValueChange={text => setSelectedCode(text)} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.l,
  },
});
