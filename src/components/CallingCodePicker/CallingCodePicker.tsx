import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import { PickerItem } from '../PickerItem';
import { PickerToggler } from '../PickerToggler';
import { Search } from '../Search';

import { countries } from '../../data';
import { ICountry } from '../../types';

import styles from './styles';

interface ICallingCodePickerProps {
  /**
   * Value matching the ISO 3166-1 alpha-2 code of one the countries.
   */
  selectedValue: string;
  /**
   * Callback for when a country is selected.
   * @param `alpha2Code`: the ISO 3166-1 alpha-2 code of the selected country
   */
  onValueChange: (alpha2Code: string) => void;
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
  selectedValue,
  onValueChange,
  togglerContainerStyle,
  togglerLabelStyle,
  listContainerStyle,
  listStyle,
  pickerItemLabelStyle,
  searchInputStyle,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(undefined);
  const [countriesData, setCountriesData] = useState<ICountry[]>(countries);
  const localCountryCode = RNLocalize.getCountry();
  const alphaCodeWithFallback = selectedValue || localCountryCode;

  const handleCountrySelect = (itemValue: string) => {
    onValueChange(itemValue);
    resetPickerState();
  };

  const resetPickerState = () => {
    setIsPickerOpen(s => !s);
    setSearchValue('');
    setCountriesData(countries);
  };

  const filterCountries = useCallback(
    (country: ICountry) => {
      const { name, callingCode, alpha2Code } = country;
      const isNameMatches =
        name.toLowerCase().includes(searchValue) ||
        name.includes(searchValue) ||
        alpha2Code.toLowerCase() === searchValue ||
        alpha2Code === searchValue;
      const isCodeMatches = callingCode === searchValue;
      return isNameMatches || isCodeMatches;
    },
    [searchValue],
  );

  const findTheSelectedCountry = useCallback(
    (country: ICountry) => {
      return country.alpha2Code === alphaCodeWithFallback;
    },
    [alphaCodeWithFallback],
  );

  const renderPickerItem = (renderItem: ListRenderItemInfo<ICountry>) => {
    const { item: country } = renderItem;
    return (
      <PickerItem
        country={country}
        onCountrySelect={handleCountrySelect}
        textStyle={pickerItemLabelStyle}
      />
    );
  };

  useEffect(() => {
    const country = countries.find(findTheSelectedCountry);
    country && setSelectedCountry(country);
  }, [findTheSelectedCountry]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filtered = countries.filter(filterCountries);
      setCountriesData(filtered);
    }
  }, [filterCountries, searchValue.length]);

  return (
    <>
      <PickerToggler
        flag={selectedCountry?.flag}
        selectedCode={selectedCountry?.callingCode}
        isPickerOpen={isPickerOpen}
        onPickerToggle={resetPickerState}
        containerStyle={togglerContainerStyle}
        textStyle={togglerLabelStyle}
      />
      {isPickerOpen && (
        <View style={[styles.listContainer, listContainerStyle]}>
          <Search value={searchValue} onChangeText={setSearchValue} inputStyle={searchInputStyle} />
          <FlatList
            data={countriesData}
            renderItem={renderPickerItem}
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
