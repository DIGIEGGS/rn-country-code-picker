import React, { createRef, useEffect, useState } from 'react';
import {
    Dimensions, FlatList, KeyboardAvoidingView, ListRenderItemInfo, Modal, Platform,
    TouchableOpacity, View
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import countries from '../../data/countries';
import { onLayoutToggle, sortData } from '../../functions/utility';
import { MODAL_SIZE, spacing } from '../../theme';
import { ICallingCodePickerProps, ICountry, IItemMeasure } from '../../types';
import ItemSeparator from '../ItemSeparator';
import PickerItem from '../PickerItem';
import PickerToggler from '../PickerToggler';
import Search from '../Search';
import useStyles from './styles';

const CallingCodePicker: React.FC<ICallingCodePickerProps> = ({
  initialCountryCode,
  onValueChange,
  togglerContainerStyle,
  togglerLabelStyle,
  listContainerStyle,
  listStyle,
  pickerItemLabelStyle,
  searchInputStyle,
  pickerItemContainerStyle,
  style,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<ICountry[]>(sortData(countries, ''));
  const localCountryCode = countries.find(f => f.alpha2Code === RNLocalize.getCountry());
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(
    initialCountryCode
      ? countries.find(f => f.alpha2Code === initialCountryCode) ?? localCountryCode
      : localCountryCode,
  );
  const containerRef = createRef<View>();
  const [toggleMeasure, setToggleMeasure] = useState<IItemMeasure>();
  const [containerMeasure, setContainerMeasure] = useState<IItemMeasure>();
  const styles = useStyles(calculateModalVerticalPosition());

  const handleCountrySelect = (selectedCountry: ICountry) => {
    setSelectedCountry(selectedCountry);
    setIsPickerOpen(false);
    setSearchValue('');
  };

  useEffect(() => {
    let newCountries = countries.filter(
      s =>
        s.callingCode === searchValue.trim() ||
        s.alpha2Code.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) ||
        s.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
    );

    newCountries = sortData(newCountries, searchValue);

    setCountriesData(newCountries);
  }, [searchValue]);

  const renderPickerItem = (renderItem: ListRenderItemInfo<ICountry>) => {
    const { item: country } = renderItem;
    return (
      <PickerItem
        country={country}
        onCountrySelect={handleCountrySelect}
        textStyle={pickerItemLabelStyle}
        containerStyle={pickerItemContainerStyle}
      />
    );
  };

  function calculateModalVerticalPosition() {
    const screenHeight = Dimensions.get('window').height;
    const y = (containerMeasure?.y ?? 0) + (toggleMeasure?.height ?? 0);

    return y + MODAL_SIZE > screenHeight ? screenHeight - MODAL_SIZE - 2 * spacing.s : y;
  }

  useEffect(() => {
    onValueChange(selectedCountry?.callingCode);
  }, [selectedCountry]);

  function dismissPicker() {
    setIsPickerOpen(false);
    setSearchValue('');
  }

  return (
    <View
      style={style}
      ref={containerRef}
      onLayout={() => onLayoutToggle(containerRef, measure => setContainerMeasure(measure))}
    >
      <PickerToggler
        flag={selectedCountry?.flag}
        selectedCode={selectedCountry?.callingCode}
        isPickerOpen={isPickerOpen}
        onPickerToggle={setIsPickerOpen}
        containerStyle={togglerContainerStyle}
        textStyle={togglerLabelStyle}
        onLayout={measure => setToggleMeasure(measure)}
      />
      <Modal visible={isPickerOpen} transparent animationType="fade">
        <View style={styles.modalChild}>
          <TouchableOpacity style={styles.dismissButton} onPress={dismissPicker} />
          <KeyboardAvoidingView
            behavior="position"
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : -60}
          >
            <View style={listContainerStyle ?? styles.listContainer}>
              <Search
                value={searchValue}
                onChangeText={setSearchValue}
                onClearInput={() => setSearchValue('')}
                inputStyle={searchInputStyle}
              />
              <FlatList
                data={countriesData}
                renderItem={renderPickerItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={listStyle}
                ItemSeparatorComponent={ItemSeparator}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default CallingCodePicker;
