import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Button, Keyboard, Vibration} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Routes} from '../../navigation/Routes';

import {LocalLogin} from '../../services/LocalLogin';

import {PincodeInput} from '../../components/PincodeInput';
import {IFaceID} from '../../components/IFaceID';

import {
  AvoidingView,
  Container,
  Title,
  Caption,
  Cancel,
  FaceIDTouch,
} from './Pincode.style';

const CELL_COUNT = 6;

export const Pincode = observer(({navigation, route: {params}}: any) => {
  const {top} = useSafeAreaInsets();
  const [pass, setPass] = useState<null | string>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const onAction = () => {
    if (params.cancelPincode) {
      LocalLogin.clearActive();
      navigation.goBack();
    } else {
      navigation.replace(Routes.Home);
    }
  };

  const onBiometryPass = async () => {
    if (LocalLogin.biometricEnabled) {
      const passed = await LocalLogin.signInWithBiometry();
      if (passed) {
        onAction();
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      onBiometryPass();
      const password = await LocalLogin.getActiveCode();
      setPass(password);
    };

    init();
  }, []);

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      if (pass) {
        if (pass === value) {
          onAction();
        } else {
          Vibration.vibrate();
          LocalLogin.increaseAttemps();
          setValue('');
          setError(true);
          if (LocalLogin.blocked) {
            navigation.reset({
              index: 0,
              routes: [{name: Routes.Pin, params: {cancelPincode: false}}],
            });
          }
        }
      }
    }
  }, [value, pass]);

  if (LocalLogin.blocked) {
    return (
      <Container>
        <Title error={false}>
          В реальном приложении тут должно быть окно востановления пароля, но у
          нас будет просто кнопка)
        </Title>
        <Button
          onPress={LocalLogin.resetBlockedApp}
          title="Восстановить доступ"
        />
      </Container>
    );
  }

  return (
    <AvoidingView onTouchStart={Keyboard.dismiss}>
      {params.cancelPincode && (
        <Cancel topInsert={top} onPress={navigation.goBack}>
          <Caption>Cancel</Caption>
        </Cancel>
      )}
      {
        <Title error={error}>
          {error
            ? `Code is incorrect, please, repeat.\nRemaining attemps: ${
                LocalLogin.maxAttemps - LocalLogin.attemps
              }`
            : 'Confirm your code' +
              (params.cancelPincode ? ' to disable protection' : '')}
        </Title>
      }
      <PincodeInput
        cellCount={CELL_COUNT}
        value={value}
        onChangeText={setValue}
      />
      {LocalLogin.biometricEnabled && (
        <FaceIDTouch onPress={onBiometryPass}>
          <IFaceID />
        </FaceIDTouch>
      )}
    </AvoidingView>
  );
});
