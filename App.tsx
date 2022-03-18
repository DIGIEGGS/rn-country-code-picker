import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CallingCodePicker from './src/components/CallingCodePicker';

const App = () => {
  const [selectedCode, setSelectedCode] = useState<string | undefined>('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{`Selected code is: ${selectedCode}`}</Text>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.inputContainer}>
          <CallingCodePicker
            isFlagVisible={false}
            onValueChange={text => setSelectedCode(text)}
            style={styles.picker}
          />
          <TextInput style={styles.input} keyboardType="number-pad" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: { width: '90%', alignSelf: 'center' },
  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    height: 45,
  },
  input: {
    justifyContent: 'center',
    flex: 1,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    paddingLeft: 5,
  },
  picker: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f1ff',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
  },
});
