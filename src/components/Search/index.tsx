import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';
import { ISearchProps } from '../../types';
import { SvgClose, SvgSearch } from '../icons';
import styles from './styles';

const Search: React.FC<ISearchProps> = ({ value, onChangeText, onClearInput, inputStyle }) => {
  const [valueState, setValueState] = useState(value);

  function handleChangeText(text: string) {
    onChangeText(text);
    setValueState(text);
  }

  function handleClear() {
    handleChangeText('');
    onClearInput();
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SvgSearch color={colors.grey} />
      </View>
      <TextInput
        placeholder="Country name or abbreviation"
        value={valueState}
        onChangeText={handleChangeText}
        style={[styles.input, inputStyle]}
        testID="search-input"
      />
      {valueState ? (
        <View style={styles.clearContainer}>
          <TouchableOpacity onPress={handleClear} testID="clear-button">
            <SvgClose color={colors.white} width={20} height={20} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Search;
