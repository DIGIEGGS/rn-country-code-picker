import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';

import { colors, spacing } from '../theme';
import { SvgSearch, SvgClose } from './icons';

interface ISearchProps {
  value: string;
  onChangeText: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
}

const Search: React.FC<ISearchProps> = ({ value, onChangeText, inputStyle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SvgSearch color={colors.grey} />
      </View>
      <TextInput
        placeholder="Country or code"
        {...{ value, onChangeText }}
        style={[styles.input, inputStyle]}
      />
      {value.length > 0 && (
        <View style={styles.clearContainer}>
          <TouchableOpacity onPress={() => onChangeText('')}>
            <SvgClose color={colors.white} width={20} height={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  input: {
    paddingLeft: spacing.xl,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  clearContainer: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: colors.greyLight,
    borderRadius: 12,
    padding: 2,
  },
});
