import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';

const ToastContext = React.createContext({asdf: 'qwer'});
const {Provider} = ToastContext;
export {ToastContext};

const containerStyle = {
  backgroundColor: 'yellow',
  minWidth: 200,
  padding: 15,
};
const styles = StyleSheet.create({
  positioner: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: containerStyle,
  errorContainer: {
    ...containerStyle,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
const emptyObj = {};
const Toast = ({children}) => {
  const toastRef = useRef();
  const [toastData, setToast] = useState(null);
  const [animationStyle, setAnimationStyle] = useState(null);
  const [lastToastDataState, setLastToastDataState] = useState(null);
  if (!animationStyle) {
    setAnimationStyle([styles.positioner, {opacity: new Animated.Value(0)}]);
  }
  const {text, isError} = toastData || emptyObj;
  let toastContentToUse = text;
  if (['string', 'number'].includes(typeof toastContentToUse)) {
    toastContentToUse = <Text style={styles.text}>{toastContentToUse}</Text>;
  }
  useEffect(() => {
    if (lastToastDataState === toastData) {
      return null;
    }
    if (toastRef.anim) {
      toastRef.anim.stop();
      animationStyle[1].opacity.setValue(0);
      toastRef.anim = null;
    }
    if (!toastData || !toastData.text) {
      return null;
    }

    setLastToastDataState(toastData);
    toastRef.anim = Animated.timing(animationStyle[1].opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (!finished) {
        return null;
      }
      toastRef.anim = Animated.timing(animationStyle[1].opacity, {
        toValue: 0,
        delay: 3000,
        duration: 300,
        useNativeDriver: true,
      }).start();
      return null;
    });
    return () => {
      toastRef.anim && toastRef.anim.stop();
    };
  }, [toastRef, lastToastDataState, toastData, animationStyle]);
  let hasToastElements = true;
  if (!lastToastDataState) {
    hasToastElements = false;
  }
  if (!children) {
    hasToastElements = false;
  }
  return (
    <Provider value={setToast}>
      {hasToastElements && (
        <Animated.View style={animationStyle}>
          <View style={isError ? styles.errorContainer : styles.container}>
            {toastContentToUse}
          </View>
        </Animated.View>
      )}
      {children}
    </Provider>
  );
};

export default Toast;
