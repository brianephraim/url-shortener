import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import UrlShortenerScreen from './UrlShortenerScreen';
import {ReduxProvider} from './reduxSetup';
import Toast from './Toast';

interface Props {
  children?: JSX.Element;
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#666',
    flex: 1,
  },
});

const AppEntry: React.FC<Props> = ({children}) => (
  <ReduxProvider>
    <SafeAreaView style={styles.safeAreaView}>
      <Toast>{children || <UrlShortenerScreen />}</Toast>
    </SafeAreaView>
  </ReduxProvider>
);

export default AppEntry;
