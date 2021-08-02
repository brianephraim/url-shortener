import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import UrlShortenerScreen from './UrlShortenerScreen';
import {ReduxProvider} from './reduxSetup';
import Toast from './Toast';

interface Props {
  children?: JSX.Element;
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#00AAD2',
    flex: 1,
  },
  bottomSafeAreaColor: {
    position: 'absolute',
    width: '100%',
    height: 100,
    backgroundColor: '#000',
    bottom: 0,
  },
});

const AppEntry: React.FC<Props> = ({children}) => (
  <ReduxProvider>
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.bottomSafeAreaColor} />
      <Toast>{children || <UrlShortenerScreen />}</Toast>
    </SafeAreaView>
  </ReduxProvider>
);

export default AppEntry;
