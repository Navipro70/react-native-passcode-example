import {CodeField} from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';

import {DissmisableView} from '../../components/DissmisableView';

export const Container = styled(DissmisableView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 500;
`;

export const CodeInput = styled(CodeField).attrs({
  keyboardType: 'number-pad',
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
