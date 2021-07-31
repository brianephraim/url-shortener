import React from 'react';
import {TouchableOpacity, Keyboard, ViewStyle} from 'react-native';

interface Props {
  children?: JSX.Element;
  style: ViewStyle;
}

const DismissKeyboard: React.FC<Props> = ({children, style}) => (
  <TouchableOpacity activeOpacity={1} style={style} onPress={Keyboard.dismiss}>
    {children}
  </TouchableOpacity>
);

export default DismissKeyboard;
