import React from 'react';
import {Keyboard, View, ViewProps} from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

export const DissmisableView = ({children, ...props}: Props) => {
  return (
    <View {...props} onTouchStart={Keyboard.dismiss}>
      {children}
    </View>
  );
};
