import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SetPincode} from '../screens/SetPincode';

import {Routes} from './Routes';
import {HomeTab} from './HomeTab';

const {Navigator, Screen, Group} = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Navigator>
      <Group screenOptions={{headerShown: false}}>
        <Screen name={Routes.Home} component={HomeTab} />
      </Group>

      <Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}>
        <Screen name={Routes.Pin} component={SetPincode} />
        <Screen name={Routes.SetPin} component={SetPincode} />
      </Group>
    </Navigator>
  );
};
