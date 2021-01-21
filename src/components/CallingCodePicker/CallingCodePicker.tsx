import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { PickerItem } from '../PickerItem';
import { PickerToggler } from '../PickerToggler';
import { Search } from '../Search';

import { countries } from '../../data';
import { ICountry } from '../../types';

import styles from './styles';

interface ICallingCodePickerProps {
  /**
   * Value matching the code of one the countries.
   */
  selectedCode: string;
  /**
   * Callback for when a country code is selected.
   * @param `code`: the code of the selected country
   */
  onCodeChange: (code: string) => void;
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
  selectedCode,
  onCodeChange,
  togglerContainerStyle,
  togglerLabelStyle,
  listContainerStyle,
  listStyle,
  pickerItemLabelStyle,
  searchInputStyle,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState<any>();
  const [countriesData, setCountriesData] = useState<ICountry[]>(countries);

  const handleCountrySelect = (itemValue: string) => {
    onCodeChange(itemValue);
    resetPickerState();
  };

  const resetPickerState = () => {
    setIsPickerOpen(s => !s);
    setSearchValue('');
    setCountriesData(countries);
  };

  const filterCountries = useCallback(
    (country: ICountry) => {
      const { name, callingCode } = country;
      const isNameMatches = name.toLowerCase().includes(searchValue) || name.includes(searchValue);
      const isCodeMatches = callingCode === searchValue;
      const condition = isNameMatches || isCodeMatches;
      return condition;
    },
    [searchValue],
  );

  const findTheSelectedCountry = useCallback(
    (country: ICountry) => {
      return country.callingCode === selectedCode;
    },
    [selectedCode],
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
    const selectedCountry = countries.find(findTheSelectedCountry)!;
    const { flag } = selectedCountry;
    setSelectedCountryFlag(flag);
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
        flag={selectedCountryFlag}
        selectedCode={selectedCode}
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
