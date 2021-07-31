import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface Style {
  positioner: ViewStyle;
  container: ViewStyle;
  errorContainer: ViewStyle;
  text: TextStyle;
}

interface OpacityStyle {
  // `any` because typescript hates `animationStyle[1].opacity.setValue(0);`
  opacity: Animated.Value | any;
}

export interface ToastData {
  text?: string;
  isError?: boolean;
}

interface Props {
  children?: JSX.Element;
}

const containerStyle = {
  backgroundColor: 'yellow',
  minWidth: 200,
  padding: 15,
};

const ToastContext = React.createContext({});
const {Provider} = ToastContext;
export {ToastContext};

const styles = StyleSheet.create<Style>({
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
  const [toastData, setToast] = useState<ToastData | null>(null);
  const [animationStyle] = useState<(ViewStyle | OpacityStyle)[]>([
    styles.positioner,
    {opacity: new Animated.Value(0)},
  ]);
  const [lastToastDataState, setLastToastDataState] =
    useState<ToastData | null>(null);
  const {text, isError} = toastData || {};
  useEffect(() => {
    if (lastToastDataState === toastData) {
      return;
    }
    if (animRef.current) {
      animRef.current.stop();
      animationStyle[1].opacity.setValue(0);
      animRef.current = null;
    }
    if (!toastData || !toastData.text) {
      return;
    }

    setLastToastDataState(toastData);
    animRef.current = Animated.timing(animationStyle[1].opacity, {
      toValue: 1,
      duration: 300,
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
        animRef.current = Animated.timing(animationStyle[1].opacity, {
          toValue: 0,
          delay: 3000,
          duration: 300,
          useNativeDriver: true,
        });
        animRef.current.start();
      }
    });
  }, [animRef, lastToastDataState, toastData, animationStyle]);

  useEffect(() => {
    // only running this cleanup on unmount
    return () => {
      if (animRef.current && animRef.current) {
        animRef.current.stop();
      }
    };
  }, []);

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
            <Text style={styles.text}>{text}</Text>
          </View>
        </Animated.View>
      )}
      {children}
    </Provider>
  );
};

export default Toast;
