import React from 'react';
import { View } from 'react-native';
import { ICountry, IItemMeasure } from '../types';

export async function onLayoutToggle(
  ref: React.RefObject<View>,
  callback: (measure: IItemMeasure) => void,
) {
  if (ref) {
    ref.current?.measure((x, y, width, height, px, py) => {
      const measure = { x: px, y: py, width, height };
      callback(measure);
    });
  }
}

export function sortData(countries: Array<ICountry>, searchValue: string) {
  return countries.sort((a, b) =>
    searchValue && a.name.toLowerCase() < b.name.toLowerCase()
      ? -1
      : a.name.toLowerCase().startsWith(searchValue.toLowerCase())
      ? -1
      : a.name.toLowerCase() === searchValue.toLowerCase()
      ? -1
      : a.alpha2Code.toLowerCase() === searchValue.toLowerCase()
      ? -1
      : a.callingCode === searchValue
      ? -1
      : 1,
  );
}
