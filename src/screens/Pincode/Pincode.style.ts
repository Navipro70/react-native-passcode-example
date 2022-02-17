import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 24px;
`;

export const FaceIDTouch = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const Cancel = styled.TouchableOpacity<{topInsert: number}>`
  position: absolute;
  top: ${({topInsert}) => topInsert + 16}px;
  left: 16px;
`;

export const Caption = styled.Text`
  font-size: 16px;
  color: rgb(0, 64, 221);
`;

export const AvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<{error: boolean}>`
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 500;
  color: ${({error}) => (error ? 'rgb(255, 40, 40)' : '#000')};
  text-align: center;
`;
