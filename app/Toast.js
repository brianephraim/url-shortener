import React, {useEffect, useState} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';

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

const Toast = ({children, timestamp}) => {
  const [animationStyle, setAnimationStyle] = useState(null);
  const [lastTimestamp, setLasttimestamp] = useState(null);
  if (!animationStyle) {
    setAnimationStyle([styles.positioner, {opacity: new Animated.Value(0)}]);
  }
  let childrenToUse = children;
  if (['string', 'number'].includes(typeof children)) {
    childrenToUse = <Text style={styles.text}>{children}</Text>;
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
  if (!lastTimestamp) {
    return null;
  }
  if (!children) {
    return null;
  }
  return (
    <Animated.View style={animationStyle}>
      <View style={styles.container}>{childrenToUse}</View>
    </Animated.View>
  );
};

export default Toast;
