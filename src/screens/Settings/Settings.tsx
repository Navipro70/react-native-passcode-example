import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Press, Text} from './Settings.style';

export const Settings = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const onProtect = () => {
    navigation.navigate();
  };

  return (
    <Container topInsert={top}>
      <Press onPress={onProtect}>
        <Text>Блокировка приложения</Text>
      </Press>
    </Container>
  );
};
