import React from 'react';
import { StyleProp, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import { SvgSearch, SvgClose } from '../icons';

import styles from './styles';

interface ISearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onClearInput: () => void;
  inputStyle?: StyleProp<TextStyle>;
}

const Search: React.FC<ISearchProps> = ({ value, onChangeText, onClearInput, inputStyle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SvgSearch color={colors.grey} />
      </View>
      <TextInput
        placeholder="Country, calling code or alpha (e.g: FR)"
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
      />
      {value.length > 0 && (
        <View style={styles.clearContainer}>
          <TouchableOpacity onPress={onClearInput}>
            <SvgClose color={colors.white} width={20} height={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Search;
