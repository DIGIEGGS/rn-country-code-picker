import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { countries } from './data';
import { PickerItem, PickerToggler, Search } from './components';
import { borderRadii, colors, spacing } from './theme';

interface ICallingCodePickerProps {
  /**
   * Value matching value of one of the items. Can be a string.
   */
  selectedValue?: string;
  /**
   * Callback for when a country code is selected. This is called with the following parameters:
   *   - `itemValue`: the value of the item that was selected
   */
  onValueChange?: (itemValue: string) => void;
  /**
   * Style to apply to the main container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style to apply to the picker toggler label.
   */
  pickerTogglerLabelStyle?: StyleProp<TextStyle>;
  /**
   * Style to apply to the list container.
   */
  listContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style to apply to the search input.
   */
  searchInputStyle?: StyleProp<TextStyle>;
  /**
   * Style to apply to the FlatList component.
   */
  listStyle?: StyleProp<ViewStyle>;
  /**
   * Style to apply to each of the item labels.
   */
  pickerItemLabelStyle?: StyleProp<TextStyle>;
}

const CallingCodePicker: React.FC<ICallingCodePickerProps> = ({
  selectedValue,
  onValueChange,
  containerStyle,
  listContainerStyle,
  listStyle,
  pickerItemLabelStyle,
  pickerTogglerLabelStyle,
  searchInputStyle,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const selectedCountryCode = useMemo(() => {
    const selectedCountry = countries.find(country => country.callingCodes[0] === selectedValue);
    return selectedCountry?.alpha2Code.toLowerCase() || 'tr';
  }, [selectedValue]);

  const countriesData = useMemo(() => {
    if (searchValue.length > 0) {
      const filtered = countries.filter(
        country =>
          country.name.toLowerCase().includes(searchValue) ||
          country.name.includes(searchValue) ||
          country.callingCodes[0] === searchValue,
      );
      return filtered;
    } else {
      return countries;
    }
  }, [searchValue]);

  const handleItemSelect = (itemValue: string) => {
    onValueChange && onValueChange(itemValue);
    setIsPickerOpen(false);
    setSearchValue('');
  };

  const handleTogglePicker = () => {
    setIsPickerOpen(s => !s);
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <PickerToggler
        {...{ selectedCountryCode }}
        selectedValue={selectedValue || '90'}
        onPickerToggle={handleTogglePicker}
        textStyle={pickerTogglerLabelStyle}
        {...{ isPickerOpen }}
      />
      {isPickerOpen && (
        <View style={[styles.listContainer, listContainerStyle]}>
          <Search
            value={searchValue}
            onChangeText={text => setSearchValue(text)}
            inputStyle={searchInputStyle}
          />
          <FlatList
            data={countriesData}
            renderItem={({ item }) => (
              <PickerItem
                {...{ item }}
                onItemSelect={handleItemSelect}
                textStyle={pickerItemLabelStyle}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={[styles.list, listStyle]}
          />
        </View>
      )}
    </View>
  );
};

export default CallingCodePicker;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  listContainer: {
    position: 'absolute',
    top: 45,
    width: '100%',
    height: 300,
    paddingHorizontal: spacing.m,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderRadius: borderRadii.s,
    elevation: 3,
  },
  list: {
    paddingVertical: spacing.s,
  },
});
