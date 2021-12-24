# React Native Country Code Picker

You can read our article about this package: https://medium.com/digieggs/complete-guide-to-using-country-code-picker-in-your-react-native-projects-daedc55cc4c4

## ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![npm](https://img.shields.io/npm/v/@digieggs/rn-country-code-picker) ![npm](https://img.shields.io/npm/dm/@digieggs/rn-country-code-picker)

A searchable dropdown component to select a country code for your phone number input.

<img src="https://user-images.githubusercontent.com/89466000/142383483-3cccf747-202c-4bd1-a337-1b11cb495bba.gif" width="300">

## For Managed Workflow users using Expo

This component is not supported in the managed workflow for expo for the time being.

## Getting started

`npm install @digieggs/rn-country-code-picker`

or

`yarn add @digieggs/rn-country-code-picker`

Also you need to manually install `react-native-svg` and `react-native-localize` libraries for the icons in the component

`npm install react-native-svg react-native-localize`

or

`yarn add react-native-svg react-native-localize`

### For react-native@0.60.0 or above

As [react-native@0.60.0](https://reactnative.dev/blog/2019/07/03/version-60) or above supports autolinking, so there is no need to run linking process.
Read more about autolinking [here](https://github.com/react-native-picker/cli/blob/master/docs/autolinking.md).

#### iOS

CocoaPods on iOS needs this extra step

```
npx pod-install
```

#### Android

No additional step is required.

## Usage

First of all, import the component.

```javascript
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';
```

Then use it like this.

```javascript
const [selectedCallingCode, setSelectedCallingCode] = useState('');

return <CallingCodePicker onValueChange={callingCode => setSelectedCallingCode(callingCode)} />;
```

## Props

- [`initialCountryCode`](#initialCountryCode)
- [`onValueChange`](#onValueChange)
- [`togglerContainerStyle`](#containerStyle)
- [`togglerLabelStyle`](#pickerTogglerLabelStyle)
- [`listContainerStyle`](#listContainerStyle)
- [`searchInputStyle`](#searchInputStyle)
- [`listStyle`](#listStyle)
- [`pickerItemLabelStyle`](#pickerItemLabelStyle)
- [`pickerItemContainerStyle`](#pickerItemContainerStyle)
- [`style`](#style)

---

# Reference

## Props

### `initialCountryCode`

the ISO 3166-1 alpha-2 code (FR, US, CA) of the country that you would like to show initially. If you don't pass a value to this, the country code based on your device locale will be used.

| Type   | Required |
| ------ | -------- |
| string | no       |

---

### `onValueChange`

Callback for when a country is selected.

- `callingCode`: the calling code of the selected country

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `togglerContainerStyle`

Style to apply to the toggler container.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `togglerLabelStyle`

Style to apply to the picker toggler label.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `listContainerStyle`

Style to apply to the list container.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `searchInputStyle`

Style to apply to the search input.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `listStyle`

Style to apply to the FlatList component.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `pickerItemLabelStyle`

Style to apply to each of the item labels.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `pickerItemContainerStyle`

Style to apply to each of the item container.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

### `style`

Style to apply to container.

| Type      | Required |
| --------- | -------- |
| StyleProp | No       |

---

## Credits

- https://www.countryflags.io/ (for the flags)
- https://restcountries.eu/ (fetched the info in the countries.json from this api)
