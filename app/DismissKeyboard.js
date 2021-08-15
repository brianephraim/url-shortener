import React from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';

const DismissKeyboard = ({children, style}) => (
  <TouchableOpacity activeOpacity={1} style={style} onPress={Keyboard.dismiss}>
    {children}
  </TouchableOpacity>
);

export default DismissKeyboard;
