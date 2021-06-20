import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';

import { PickerItem } from '../PickerItem';
import { PickerToggler } from '../PickerToggler';
import { Search } from '../Search';

import { colors } from '../../theme';
import { countries } from '../../data';
import { ICountry } from '../../types';

import styles from './styles';

interface ICallingCodePickerProps {
  /**
   * the ISO 3166-1 alpha-2 code (FR, US, CA) of the country that you would like to show initially.
   */
  initialCountryCode?: string;
  /**
   * Callback for when a country is selected.
   * @param `callingCode`: the calling code of the selected country
   */
  onValueChange: (callingCode: string) => void;
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
  initialCountryCode,
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
  const [selectedCountryState, setSelectedCountryState] = useState<ICountry | undefined>(undefined);
  const [countriesData, setCountriesData] = useState<ICountry[]>(countries);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const localCountryCode = RNLocalize.getCountry();

  const resetPickerState = (togglePicker?: boolean) => {
    togglePicker && setIsPickerOpen(state => !state);
    setSearchValue('');
    setCountriesData(countries);
  };

  const handleCountrySelect = (selectedCountry: ICountry) => {
    setSelectedCountryState(selectedCountry);
    onValueChange(selectedCountry.callingCode);
    resetPickerState(true);
  };

  const toggleSearchingState = () => {
    setIsSearching(state => !state);
  };

  const filterCountries = useCallback(
    (country: ICountry) => {
      const { name, callingCode, alpha2Code } = country;
      const alpha2CodeMatches =
        alpha2Code.toLowerCase() === searchValue || alpha2Code === searchValue;
      const isNameMatches = name.toLowerCase().includes(searchValue) || name.includes(searchValue);

      const isCodeMatches = callingCode === searchValue;
      return isNameMatches || isCodeMatches || alpha2CodeMatches;
    },
    [searchValue],
  );

  const findCountry = useCallback(() => {
    const alpha2CodeWithFallback =
      initialCountryCode ?? selectedCountryState?.alpha2Code ?? localCountryCode;
    toggleSearchingState();
    const filteredCountry = countries.find(
      country => country.alpha2Code === alpha2CodeWithFallback,
    );
    if (filteredCountry) {
      setSelectedCountryState(filteredCountry);
      onValueChange(filteredCountry?.callingCode);
      toggleSearchingState();
    }
  }, [initialCountryCode, localCountryCode, onValueChange, selectedCountryState]);

  useEffect(() => {
    findCountry();
  }, [findCountry]);

  useEffect(() => {
    if (searchValue.length > 0) {
      toggleSearchingState();
      const filtered = countries.filter(filterCountries);
      if (filtered) {
        setCountriesData(filtered);
        toggleSearchingState();
      }
    }
  }, [filterCountries, searchValue.length]);

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

  return (
    <View style={styles.container}>
      <PickerToggler
        flag={selectedCountryState?.flag}
        selectedCode={selectedCountryState?.callingCode}
        isPickerOpen={isPickerOpen}
        onPickerToggle={() => resetPickerState(true)}
        containerStyle={togglerContainerStyle}
        textStyle={togglerLabelStyle}
      />
      {isPickerOpen && (
        <View style={[styles.listContainer, listContainerStyle]}>
          <Search
            value={searchValue}
            onChangeText={setSearchValue}
            onClearInput={() => resetPickerState()}
            inputStyle={searchInputStyle}
          />
          {isSearching ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : (
            <FlatList
              data={countriesData}
              renderItem={renderPickerItem}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={[styles.list, listStyle]}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CallingCodePicker;
