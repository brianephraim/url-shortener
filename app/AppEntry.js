import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import UrlShortenerScreen from './UrlShortenerScreen';
import {ReduxProvider} from './reduxSetup';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#666',
    flex: 1,
  },
});

const AppEntry = () => (
  <ReduxProvider>
    <SafeAreaView style={styles.safeAreaView}>
      <UrlShortenerScreen />
    </SafeAreaView>
  </ReduxProvider>
);

export default AppEntry;
