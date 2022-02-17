import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Settings} from '../screens/Settings';
import {Home} from '../screens/Home';

import {HomeTabRoutes} from './Routes';

const {Navigator, Screen} = createBottomTabNavigator();

export const HomeTab = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={HomeTabRoutes.Home} component={Home} />
      <Screen name={HomeTabRoutes.Profile} component={Settings} />
    </Navigator>
  );
};
