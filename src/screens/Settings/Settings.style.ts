import styled from 'styled-components/native';

export const Container = styled.View<{topInsert: number}>`
  flex: 1;

  padding: 20px;
  padding-top: ${({topInsert}) => topInsert + 20}px;

  background-color: white;
`;

export const Press = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 12px;
  margin-bottom: 20px;

  border-radius: 8px;

  background-color: rgba(0, 0, 0, 0.1);
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;
