import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { PickerToggler } from '.';
import mockCountry from '../../__mocks__/country';

const onPickerToggleMockFn = jest.fn();

const PICKER_TOGGLER_COMPONENT = (
  <PickerToggler
    flag={mockCountry.flag}
    selectedCode={mockCountry.callingCode}
    onPickerToggle={onPickerToggleMockFn}
  />
);

test('renders correctly', () => {
  const { toJSON, getByText } = render(PICKER_TOGGLER_COMPONENT);
  const rendered = toJSON();
  const callingCode = getByText(`+${mockCountry.callingCode}`);

  expect(callingCode).toBeTruthy();
  expect(rendered).toMatchSnapshot();
});

test('toggles picker on click', () => {
  const { getByTestId } = render(PICKER_TOGGLER_COMPONENT);
  const toggler = getByTestId('toggler-button');
  fireEvent.press(toggler);
  expect(onPickerToggleMockFn).toHaveBeenCalledWith(true);

  fireEvent.press(toggler);
  expect(onPickerToggleMockFn).toHaveBeenCalledWith(false);
});
