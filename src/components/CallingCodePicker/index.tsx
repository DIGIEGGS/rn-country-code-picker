import React, { createRef, useEffect, useState } from 'react';
import {
    Dimensions, FlatList, KeyboardAvoidingView, ListRenderItemInfo, Modal, Platform,
    TouchableOpacity, View
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import countries from '../../data/countries';
import { onLayoutToggle } from '../../functions/utility';
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
  const [countriesData, setCountriesData] = useState<ICountry[]>(countries);
  const localCountryCode = countries.find(f => f.alpha2Code === RNLocalize.getCountry());
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(localCountryCode);
  const containerRef = createRef<View>();
  const [toggleMeasure, setToggleMeasure] = useState<IItemMeasure>();
  const [containerMeasure, setContainerMeasure] = useState<IItemMeasure>();
  const styles = useStyles(calculateModalVerticalPosition());

  const handleCountrySelect = (selectedCountry: ICountry) => {
    setSelectedCountry(selectedCountry);
    onValueChange(selectedCountry.callingCode);
    setIsPickerOpen(false);
  };

  useEffect(() => {
    const newCountries = countries.filter(
      s =>
        s.alpha2Code.toLowerCase().includes(searchValue.toLowerCase()) ||
        s.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

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

  const ListView = () => (
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
      />
    </View>
  );

  function calculateModalVerticalPosition() {
    const screenHeight = Dimensions.get('window').height;
    const y = (containerMeasure?.y ?? 0) + (toggleMeasure?.height ?? 0);
    return y + MODAL_SIZE > screenHeight ? screenHeight - MODAL_SIZE - 2 * spacing.s : y;
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
        onPickerToggle={() => setIsPickerOpen(true)}
        containerStyle={togglerContainerStyle}
        textStyle={togglerLabelStyle}
        onLayout={measure => setToggleMeasure(measure)}
      />
      <Modal visible={isPickerOpen} transparent animationType="fade">
        <View style={styles.modalChild}>
          <TouchableOpacity style={styles.dismissButton} onPress={() => setIsPickerOpen(false)} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <ListView />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default CallingCodePicker;
