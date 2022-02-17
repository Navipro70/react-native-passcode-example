import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, H1} from './Home.style';

export const Home = () => {
  const {top} = useSafeAreaInsets();

  return (
    <Container topInsert={top}>
      <H1>Home page</H1>
    </Container>
  );
};
