import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import UrlShortenerScreen from './UrlShortenerScreen';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#666',
    flex: 1,
  },
});

const AppEntry = () => (
  <SafeAreaView style={styles.safeAreaView}>
    <UrlShortenerScreen />
  </SafeAreaView>
);

export default AppEntry;
