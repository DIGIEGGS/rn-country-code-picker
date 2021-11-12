import React from 'react';
import { View } from 'react-native';
import { IItemMeasure } from '../types';

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
