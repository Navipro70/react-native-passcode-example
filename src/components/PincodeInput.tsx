import React from 'react';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';

export const PincodeInput = styled(CodeField).attrs({
  autoFocus: true,
  keyboardType: 'number-pad',
  caretHidden: false,
  renderCell: ({index, symbol, isFocused}) => (
    <Cell key={index} isFocused={isFocused}>
      {symbol || (isFocused ? <Cursor /> : null)}
    </Cell>
  ),
})``;

export const Cell = styled.Text<{isFocused: boolean}>`
  width: 36px;
  height: 36px;
  margin: 0 6px;

  border-width: 2px;
  border-radius: 8px;
  border-color: ${({isFocused}) =>
    isFocused ? 'rgba(245, 147, 66, 0.7)' : 'rgba(245, 147, 66, 0.3)'};

  font-size: 20px;
  line-height: 32px;
  text-align: center;
`;
