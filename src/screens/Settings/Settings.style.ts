import styled from 'styled-components/native';

export const Container = styled.View<{topInsert: number}>`
  flex: 1;

  padding: 20px;
  padding-top: ${({topInsert}) => topInsert}px;

  background-color: white;
`;

export const Press = styled.TouchableOpacity`
  padding: 6px 12px;

  background-color: gray;
`;

export const Text = styled.Text`
  font-size: 14px;
`;
