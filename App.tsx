import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CallingCodePicker from './src/components/CallingCodePicker';
import { spacing } from './src/theme';

const App = () => {
  const [selectedCode, setSelectedCode] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>selected code is: {selectedCode}</Text>
      <CallingCodePicker onValueChange={setSelectedCode} />
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
