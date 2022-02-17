import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppNavigator} from './navigation/AppNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
