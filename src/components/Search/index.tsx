import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme';
import { ISearchProps } from '../../types';
import { SvgClose, SvgSearch } from '../icons';
import styles from './styles';

const Search: React.FC<ISearchProps> = ({ value, onChangeText, onClearInput, inputStyle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SvgSearch color={colors.grey} />
      </View>
      <TextInput
        placeholder="Country name or abbreviation"
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
