import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ICountry {
  name: string;
  alpha2Code: string;
  callingCode: string;
  flag: any;
}

export interface ICallingCodePickerProps {
  /**
   * the ISO 3166-1 alpha-2 code (FR, US, CA) of the country that you would like to show initially.
   */
  initialCountryCode?: string;
  /**
   * Callback for when a country is selected.
   * @param `callingCode`: the calling code of the selected country
   */
  onValueChange: (callingCode?: string) => void;
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
   * Style to apply to each of the item container.
   */
  pickerItemContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style to apply to each of the item labels.
   */
  pickerItemLabelStyle?: StyleProp<TextStyle>;
  /**
   * Style to apply to container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Visibility of flag component
   */
  isFlagVisible?: boolean;
}

export interface IFlagProps {
  flag?: any;
}

export interface IPickerItemProps {
  country: ICountry;
  onCountrySelect: (selectedCountry: ICountry) => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface IPickerTogglerProps {
  selectedCode?: string;
  flag?: any;
  isPickerOpen: boolean;
  onPickerToggle: (state: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onLayout: (measure: IItemMeasure) => void;
  isFlagVisible?: boolean;
}

export interface ISearchProps {
  value?: string;
  onChangeText: (text: string) => void;
  onClearInput: () => void;
  inputStyle?: StyleProp<TextStyle>;
}

export interface IStyledTextProps {
  style?: StyleProp<TextStyle>;
  children?: JSX.Element | string;
}

export interface IItemMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}
