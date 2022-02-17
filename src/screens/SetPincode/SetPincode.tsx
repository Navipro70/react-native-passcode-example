import React, {useEffect, useRef, useState} from 'react';
import {Alert, Keyboard, TextInput} from 'react-native';
import {PincodeInput} from '../../components/PincodeInput';
import {LocalLogin} from '../../services/LocalLogin';

import {Cancel, Caption, Title, AvoidingView} from './SetPincode.style';

const CELL_COUNT = 6;

export const SetPincode = ({navigation}: any) => {
  const ref = useRef<TextInput>(null);
  const [value, setValue] = useState('');
  const [repeatValue, setRepeatValue] = useState('');

  const isRepeatStep = value.length === CELL_COUNT;

  useEffect(() => {
    console.log(value, repeatValue, isRepeatStep);
    const finishCode = async () => {
      if (value === repeatValue) {
        await LocalLogin.setPincodeProtection(value);
        await LocalLogin.setBiometricProtection();
        navigation.goBack();
      } else {
        setValue('');
        setRepeatValue('');
        Alert.alert('Codes are not equal.');
        // show error
      }
    };
    if (value.length === CELL_COUNT && repeatValue.length === CELL_COUNT) {
      finishCode();
    }
  }, [value, repeatValue]);

  return (
    <AvoidingView onTouchStart={Keyboard.dismiss}>
      <Cancel onPress={navigation.goBack}>
        <Caption>Cancel</Caption>
      </Cancel>
      <Title>{isRepeatStep ? 'Confirm your code' : 'Enter secret code'}</Title>
      <PincodeInput
        ref={ref}
        cellCount={CELL_COUNT}
        value={isRepeatStep ? repeatValue : value}
        onChangeText={isRepeatStep ? setRepeatValue : setValue}
      />
    </AvoidingView>
  );
};
