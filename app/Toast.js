import React, {useEffect, useState} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';

const ToastContext = React.createContext({asdf: 'qwer'});
const {Provider} = ToastContext;
export {ToastContext};

const styles = StyleSheet.create({
  positioner: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: 'pink',
    minWidth: 200,
    padding: 15,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
const emptyObj = {};
const Toast = ({children}) => {
  const [toastData, setToast] = useState(emptyObj);
  const {content, timestamp} = toastData;
  const [animationStyle, setAnimationStyle] = useState(null);
  const [lastTimestamp, setLasttimestamp] = useState(null);
  if (!animationStyle) {
    setAnimationStyle([styles.positioner, {opacity: new Animated.Value(0)}]);
  }
  let toastContentToUse = content;
  if (['string', 'number'].includes(typeof toastContentToUse)) {
    toastContentToUse = <Text style={styles.text}>{toastContentToUse}</Text>;
  }
  useEffect(() => {
    setLasttimestamp(timestamp);
    if (!timestamp) {
      return null;
    }
    Animated.timing(animationStyle[1].opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animationStyle[1].opacity, {
        toValue: 0,
        delay: 3000,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLasttimestamp(null);
      });
    });
    return null;
  }, [timestamp, animationStyle]);
  let hasToastElements = true;
  if (!lastTimestamp) {
    hasToastElements = false;
  }
  if (!children) {
    hasToastElements = false;
  }
  return (
    <Provider value={setToast}>
      {hasToastElements && (
        <Animated.View style={animationStyle}>
          <View style={styles.container}>{toastContentToUse}</View>
        </Animated.View>
      )}
      {children}
    </Provider>
  );
};

export default Toast;
