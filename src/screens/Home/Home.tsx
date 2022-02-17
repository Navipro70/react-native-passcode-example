import {observer} from 'mobx-react-lite';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LocalLogin} from '../../services/LocalLogin';
import {Container, H1} from './Home.style';

export const Home = observer(() => {
  const {top} = useSafeAreaInsets();

  return (
    <Container topInsert={top}>
      <H1>{`Home page\n\n${
        LocalLogin.isActive
          ? 'Protection is passed\nsuccessfully 👍'
          : "Your app hasn't protection 🛡️"
      }`}</H1>
    </Container>
  );
});
