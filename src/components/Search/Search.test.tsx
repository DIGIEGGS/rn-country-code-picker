import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Search } from '.';

const onChangeTextMockFn = jest.fn();
const onClearInputMockFn = jest.fn();
const SEARCH_COMPONENT = (
  <Search onChangeText={onChangeTextMockFn} onClearInput={onClearInputMockFn} />
);
const SEARCH_VALUE = 'Turkey';

test('renders correctly', () => {
  const { toJSON } = render(SEARCH_COMPONENT);
  const rendered = toJSON();

  expect(rendered).toMatchSnapshot();
});

test('changes the input value', () => {
  const { getByTestId } = render(SEARCH_COMPONENT);

  const textInput = getByTestId('search-input');
  fireEvent.changeText(textInput, SEARCH_VALUE);

  expect(onChangeTextMockFn).toBeCalledWith(SEARCH_VALUE);
  expect(textInput.props.value).toBe(SEARCH_VALUE);
});

test('clears the input value', () => {
  const { getByTestId } = render(SEARCH_COMPONENT);

  const textInput = getByTestId('search-input');
  fireEvent.changeText(textInput, SEARCH_VALUE);

  expect(onChangeTextMockFn).toBeCalledWith(SEARCH_VALUE);
  expect(textInput.props.value).toBe(SEARCH_VALUE);

  const clearButton = getByTestId('clear-button');
  fireEvent.press(clearButton);

  expect(onClearInputMockFn).toBeCalled();
  expect(textInput.props.value).toBe('');
  expect(onChangeTextMockFn).toBeCalledWith('');
});
