import React, { useEffect, useState } from 'react';
import { StyleProp, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import { SvgSearch, SvgClose } from '../icons';

import styles from './styles';

interface ISearchProps {
  onChangeText: (text: string) => void;
  onClearInput: () => void;
  inputStyle?: StyleProp<TextStyle>;
}

const Search: React.FC<ISearchProps> = ({ onChangeText, onClearInput, inputStyle }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    onChangeText(value);
  }, [onChangeText, value]);

  const handleClearInput = () => {
    setValue('');
    onClearInput();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SvgSearch color={colors.grey} />
      </View>
      <TextInput
        placeholder="Country, calling code or alpha (e.g: FR)"
        value={value}
        onChangeText={setValue}
        style={[styles.input, inputStyle]}
        testID="search-input"
      />
      {value.length > 0 && (
        <View style={styles.clearContainer}>
          <TouchableOpacity onPress={handleClearInput} testID="clear-button">
            <SvgClose color={colors.white} width={20} height={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Search;
