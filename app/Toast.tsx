import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  SafeAreaView,
} from 'react-native';

interface ToastData {
  text?: string;
  isError?: boolean;
}

interface ToastDataComparable {
  current: ToastData | null;
  prev: ToastData | null;
}

export type ToastContextType = (toastData: ToastData) => void;

interface Style {
  [styleName: string]: ViewStyle | TextStyle;
}

interface OpacityStyle {
  opacity: Animated.Value;
}

interface Props {
  children?: JSX.Element;
}

export const testIDToastText = 'testIDToastText';
export const toastDelayTime = 3000;
export const toastDurationTime = 300;
export const toastEntireTime =
  toastDurationTime + toastDelayTime + toastDurationTime + 1;

const containerStyle = {
  backgroundColor: '#ccc',
  minWidth: 200,
  padding: 15,
  borderRadius: 10,
};

const ToastContext = React.createContext({});
const {Provider} = ToastContext;
export {ToastContext};

const styles = StyleSheet.create<Style>({
  safeAreaView: {flex: 1},
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

const Toast: React.FC<Props> = ({children}) => {
  const animRef = useRef<Animated.CompositeAnimation | null>();
  const [toastDatComparable, setToastComparable] =
    useState<ToastDataComparable>({current: null, prev: null});
  const opacityStyle = useRef<OpacityStyle>({opacity: new Animated.Value(0)});
  const animationStyle = useRef([styles.positioner, opacityStyle.current]);
  const setToast = useCallback(
    data => {
      setToastComparable({
        current: data,
        prev: null,
      });
    },
    [setToastComparable]
  );

  const toastData = toastDatComparable.current || {};
  const {text, isError} = toastData || {};
  useEffect(() => {
    if (toastDatComparable.current === toastDatComparable.prev) {
      return;
    }
    if (animRef.current) {
      animRef.current.stop();
      opacityStyle.current.opacity.setValue(0);
      animRef.current = null;
    }
    if (!toastDatComparable.current || !toastDatComparable.current.text) {
      return;
    }
    setToastComparable({
      current: toastDatComparable.current,
      prev: toastDatComparable.current,
    });
    animRef.current = Animated.timing(opacityStyle.current.opacity, {
      toValue: 1,
      duration: toastDurationTime,
      useNativeDriver: true,
    });
    animRef.current.start(({finished}) => {
      if (!finished) {
        return;
      }
      if (!finished) {
        return;
      }
      if (animRef.current) {
        animRef.current = Animated.timing(opacityStyle.current.opacity, {
          toValue: 0,
          delay: toastDelayTime,
          duration: toastDurationTime,
          useNativeDriver: true,
        });
        animRef.current.start(({finished: finished2}) => {
          if (finished2) {
            animRef.current = undefined;
            setToastComparable({
              current: null,
              prev: null,
            });
          }
        });
      }
    });
  }, [animRef, animationStyle, toastDatComparable, setToastComparable]);

  useEffect(() => {
    // only running this cleanup on unmount
    return () => {
      if (animRef.current && animRef.current) {
        animRef.current.stop();
      }
    };
  }, []);

  let hasToastElements = true;
  if (!toastDatComparable.prev) {
    hasToastElements = false;
  }
  if (!children) {
    hasToastElements = false;
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Provider value={setToast}>
        {hasToastElements && (
          <Animated.View style={animationStyle.current}>
            <View style={isError ? styles.errorContainer : styles.container}>
              <Text style={styles.text} testID={testIDToastText}>
                {text}
              </Text>
            </View>
          </Animated.View>
        )}
        {children}
      </Provider>
    </SafeAreaView>
  );
};

export default Toast;
