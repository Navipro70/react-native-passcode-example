import {observer} from 'mobx-react-lite';
import React from 'react';
import {Switch} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Routes} from '../../navigation/Routes';
import {LocalLogin} from '../../services/LocalLogin';

import {Container, Press, Text} from './Settings.style';

export const Settings = observer(({navigation}: any) => {
  const {top} = useSafeAreaInsets();

  const onProtect = () => {
    if (LocalLogin.isActive) {
      navigation.navigate(Routes.Pin, {cancelPincode: true});
    } else {
      navigation.navigate(Routes.SetPin);
    }
  };

  const onSwitchBiometric = () => {
    if (LocalLogin.biometricEnabled) {
      LocalLogin.clearBiometric();
    } else {
      LocalLogin.setBiometricProtection();
    }
  };

  return (
    <Container topInsert={top}>
      <Press onPress={onProtect}>
        <Text>🔒 Set protection</Text>
        <Switch value={LocalLogin.isActive} onValueChange={onProtect} />
      </Press>
      {LocalLogin.isActive && (
        <Press onPress={onSwitchBiometric}>
          <Text>😀 Enable biometric</Text>
          <Switch
            value={LocalLogin.biometricEnabled}
            onValueChange={onSwitchBiometric}
          />
        </Press>
      )}
    </Container>
  );
});
