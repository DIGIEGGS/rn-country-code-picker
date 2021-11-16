import React from 'react';
import { render } from '@testing-library/react-native';
import StyledText from './';

test('renders correctly', () => {
  const text = 'Test Text';
  const { toJSON, getByText } = render(<StyledText>{text}</StyledText>);
  const rendered = toJSON();

  expect(getByText(`${text} `)).toBeTruthy();
  expect(rendered).toMatchSnapshot();
});
