import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const AvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Cancel = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 16px;
`;

export const Caption = styled.Text`
  font-size: 16px;
  color: rgb(0, 64, 221);
`;

export const Title = styled.Text`
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 500;
`;
