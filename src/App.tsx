import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppNavigator} from './navigation/AppNavigator';
import {LocalLogin} from './services/LocalLogin';
import {observer} from 'mobx-react-lite';
import {Routes} from './navigation/Routes';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

export const App = observer(() => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await LocalLogin.refreshActive();
      await LocalLogin.refreshBiometric();
    };

    init().finally(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={
        LocalLogin.isActive
          ? {routes: [{name: Routes.Pin, params: {cancelPincode: false}}]}
          : undefined
      }>
      <AppNavigator />
    </NavigationContainer>
  );
});
