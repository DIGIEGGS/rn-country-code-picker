import React from 'react';
import { render } from '@testing-library/react-native';
import mockCountry from '../../__mocks__/country';
import Flag from './';

test('renders correctly', () => {
  const mockFlag = mockCountry.flag;
  const { toJSON, getByTestId } = render(<Flag flag={mockFlag} />);
  const rendered = toJSON();
  const image = getByTestId('flag-image');

  expect(image.props.source).toBe(mockFlag);
  expect(rendered).toMatchSnapshot();
});
