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
import { ICountry } from './types';

interface ICallingCodePickerProps {
  /**
   * An object containing the selected country info.
   */
  selectedCountry: ICountry;
  /**
   * Callback for when a country code is selected. This is called with the following parameters:
   *   - `country`: an object containing the selected country info
   */
  onCountrySelect: (country: ICountry) => void;
  /**
   * Style to apply to the toggler container.
   */
  togglerContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style to apply to the picker toggler label.
   */
  togglerLabelStyle?: StyleProp<TextStyle>;
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
  selectedCountry,
  onCountrySelect,
  togglerContainerStyle,
  togglerLabelStyle,
  listContainerStyle,
  listStyle,
  pickerItemLabelStyle,
  searchInputStyle,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const selectedCountryFlag = useMemo(() => {
    const { callingCode, name } = selectedCountry;
    const selected = countries.find(
      country => country.callingCode === callingCode && country.name === name,
    );
    return selected?.flag;
  }, [selectedCountry]);

  const countriesData = useMemo(() => {
    if (searchValue.length > 0) {
      const filtered = countries.filter(
        country =>
          country.name.toLowerCase().includes(searchValue) ||
          country.name.includes(searchValue) ||
          country.callingCode === searchValue,
      );
      return filtered;
    } else {
      return countries;
    }
  }, [searchValue]);

  const handleCountrySelect = (country: ICountry) => {
    onCountrySelect && onCountrySelect(country);
    setIsPickerOpen(false);
    setSearchValue('');
  };

  const handleTogglePicker = () => {
    setIsPickerOpen(s => !s);
    Keyboard.dismiss();
  };

  return (
    <>
      <PickerToggler
        {...{ isPickerOpen }}
        callingCode={selectedCountry.callingCode}
        flag={selectedCountryFlag}
        onPickerToggle={handleTogglePicker}
        containerStyle={togglerContainerStyle}
        textStyle={togglerLabelStyle}
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
                onCountrySelect={handleCountrySelect}
                textStyle={pickerItemLabelStyle}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={[styles.list, listStyle]}
          />
        </View>
      )}
    </>
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
