import styled from 'styled-components/native';

export const Container = styled.View<{topInsert: number}>`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-top: ${({topInsert}) => topInsert}px;

  background-color: white;
`;

export const H1 = styled.Text`
  font-size: 24px;
`;
