import React, {useEffect, useRef, useState} from 'react';
import {Alert, TextInput} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
  RenderCellOptions,
} from 'react-native-confirmation-code-field';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

import {Cell, Container, Title} from './SetPincode.style';

const CELL_COUNT = 6;

export const SetPincode = () => {
  const [value, setValue] = useState('');
  const [repeatValue, setRepeatValue] = useState('');

  const ref = useRef<TextInput>(null);

  const getValue = () => {
    if (value.legth < 6) {
      return value;
    } else {
      return repeatValue;
    }
  };

  const onChangeText = (text: string) => {
    if (value.length < 6) {
      setValue(text);
    } else if (repeatValue.length < 6) {
      setRepeatValue(text);
    }
  };

  useEffect(() => {
    if (value.length === 6 && repeatValue.length === 6) {
      if (value === repeatValue) {
        // Ask faceID
      } else {
        // show error
      }
    }
  }, [value, repeatValue]);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}: RenderCellOptions) => (
    <Cell
      key={index}
      onLayout={getCellOnLayoutHandler(index)}
      isFocused={isFocused}>
      {symbol || (isFocused ? <Cursor /> : null)}
    </Cell>
  );

  return (
    <Container>
      <Title>Enter secret code</Title>
      <CodeField
        ref={ref}
        {...props}
        caretHidden={false}
        value={getValue()}
        onChangeText={onChangeText}
        cellCount={CELL_COUNT}
        renderCell={renderCell}
      />
    </Container>
  );
};

// TODO оформить как нормальное приложение
// Возможно вынести в библиотеку

const onAlert = (title: string, message?: string) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {
        // navigation.goBack();
      },
    },
  ]);
};

enum LocalLoginService {
  digitsOrGraph = 'digits.or.graph.protection.com',
  biometric = 'biometric.com',
}

export const setDigitsOrGraphProtection = async (
  protection: string | number[][],
) => {
  try {
    await Keychain.setGenericPassword(
      LocalLoginService.digitsOrGraph,
      JSON.stringify(protection),
      {
        service: LocalLoginService.digitsOrGraph,
      },
    );
    onAlert('Password succesfuly setted');
  } catch (e: any) {
    // Отменяем установку экрана блокировки для приложения, показываем алерт с ошибкой
    onAlert('Error occured', e?.message || 'Unable set password');
  }
};

export const loginViaDigitsOrGraph = async () => {
  try {
  } catch (e) {}
};

export const setBiometricProtection = async () => {
  try {
    // Request biometric access and check
    const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();

    if (!biometryType) {
      onAlert(
        "App require permission for biometric setup or your phone isn't support any",
      );
    }

    const {publicKey} = await ReactNativeBiometrics.createKeys();

    // TODO сделать keychain отдельным сервисом приложения
    await Keychain.setGenericPassword(LocalLoginService.biometric, publicKey, {
      service: LocalLoginService.biometric,
    });
  } catch (e) {
    // Обрабатываем ошибку
    console.log(e);
  }
};

export const loginViaBiometric = async () => {
  try {
    let payload = `Enter at: ${Math.round(new Date().getTime() / 1000)}`;
    const signatureData = await ReactNativeBiometrics.createSignature({
      promptMessage: 'Enter app',
      payload: payload,
    });

    if (signatureData.success) {
      const publicKey = await Keychain.getGenericPassword({
        service: LocalLoginService.biometric,
      });
      if (publicKey) {
        const isValid = validate(signatureData.signature, publicKey.password);
        if (isValid) {
          // Allow user to sign in or change password
        }
      }
    }
  } catch (e) {
    // Обрабатываем ошибку
    console.log(e);
  }
};
