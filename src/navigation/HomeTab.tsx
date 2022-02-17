import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Settings} from '../screens/Settings';
import {Home} from '../screens/Home';

import {HomeTabRoutes} from './Routes';
import {IHome} from '../components/IHome';
import {ISettings} from '../components/ISettings';

const {Navigator, Screen} = createBottomTabNavigator();

export const HomeTab = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name={HomeTabRoutes.Home}
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <IHome width={size} height={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Screen
        name={HomeTabRoutes.Profile}
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <ISettings width={size} height={size} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Navigator>
  );
};
